import Foundation
import Darwin

extension Core {
    /// Read only a bounded regular access record from this Oracle profile.
    /// Missing records never create an identity or authorize access.
    func licenseFile(_ relative: String, limit: Int = 8192) throws -> Data {
        let path = try scoped(relative, root: home)
        var before = stat()
        guard lstat(path.path, &before) == 0,
              before.st_mode & S_IFMT == S_IFREG, before.st_nlink == 1,
              before.st_size >= 0, before.st_size <= limit,
              before.st_flags & 0x40000000 == 0 else {
            throw failure("Registro de acesso indisponível ou irregular; nenhum arquivo foi substituído.")
        }
        let fd = open(path.path, O_RDONLY | O_NOFOLLOW | O_NONBLOCK | O_CLOEXEC)
        guard fd >= 0 else { throw failure("Registro de acesso indisponível.") }
        defer { Darwin.close(fd) }
        var opened = stat()
        guard fstat(fd, &opened) == 0, opened.st_dev == before.st_dev,
              opened.st_ino == before.st_ino, opened.st_nlink == 1,
              opened.st_size == before.st_size else { throw failure("Registro mudou antes da leitura.") }
        let handle = FileHandle(fileDescriptor: fd, closeOnDealloc: false)
        var data = Data()
        while data.count <= limit {
            let chunk = try handle.read(upToCount: min(65536, limit + 1 - data.count)) ?? Data()
            if chunk.isEmpty { break }
            data.append(chunk)
        }
        var after = stat(), current = stat()
        guard fstat(fd, &after) == 0, lstat(path.path, &current) == 0,
              current.st_dev == before.st_dev, current.st_ino == before.st_ino,
              after.st_nlink == 1, data.count == Int(before.st_size),
              before.st_size == after.st_size,
              before.st_mtimespec.tv_sec == after.st_mtimespec.tv_sec,
              before.st_mtimespec.tv_nsec == after.st_mtimespec.tv_nsec,
              before.st_ctimespec.tv_sec == after.st_ctimespec.tv_sec,
              before.st_ctimespec.tv_nsec == after.st_ctimespec.tv_nsec else {
            throw failure("Registro de acesso mudou durante a leitura.")
        }
        return data
    }

    /// Explicit UI action. Only this action requests creation of a local binding.
    func licenseDeviceRequest() throws -> [String: Any] {
        let lock = try acquireOperationLock("license")
        defer { releaseOperationLock(lock) }
        let id = try licenseDevice.identifier(create: true)
        guard OracleDeviceBinding.valid(id) else { throw failure("Vínculo do Mac inválido.") }
        let request: [String: Any] = [
            "schema_version": 2, "deviceID": id,
            "binding": "mac-and-device-local-keychain",
            "createdAt": ISO8601DateFormatter().string(from: Date()), "activated": false
        ]
        try writeJSON(request, try scoped("onboarding/device-request-v2.json", root: home))
        return request
    }

    func licenseDeviceSnapshot() -> [String: Any] {
        // A fresh snapshot never queries hardware/Keychain or creates identity.
        guard let bytes = try? licenseFile("onboarding/device-request-v2.json"),
              let object = try? JSONSerialization.jsonObject(with: bytes),
              let request = object as? [String: Any],
              let reviewed = request["deviceID"] as? String, OracleDeviceBinding.valid(reviewed) else {
            return ["deviceID": "", "deviceBindingStatus": "request_required"]
        }
        do {
            let current = try licenseDevice.identifier(create: false)
            guard current == reviewed else { return ["deviceID": "", "deviceBindingStatus": "device_changed"] }
            return ["deviceID": current, "deviceBindingStatus": "verified"]
        } catch {
            return ["deviceID": "", "deviceBindingStatus": "unavailable", "deviceBindingMessage": error.localizedDescription]
        }
    }
}
