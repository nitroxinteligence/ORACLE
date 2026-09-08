(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __moduleCache = /* @__PURE__ */ new WeakMap;
  var __toCommonJS = (from) => {
    var entry = __moduleCache.get(from), desc;
    if (entry)
      return entry;
    entry = __defProp({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function")
      __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      }));
    __moduleCache.set(from, entry);
    return entry;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {
        get: all[name],
        enumerable: true,
        configurable: true,
        set: (newValue) => all[name] = () => newValue
      });
  };

  // packages/contracts/replay.js
  var exports_replay = {};
  __export(exports_replay, {
    projectJournal: () => projectJournal
  });
  function projectJournal(baseline, events, cursor) {
    const byPath = new Map(baseline.map((entry) => [entry.path, { ...entry }]));
    const valid = (path) => typeof path === "string" && !path.startsWith("/") && !path.split("/").some((p) => p === ".." || p === "");
    for (const event of events.slice(0, cursor + 1)) {
      for (const ref of event.subject_refs || []) {
        if (!valid(ref.path))
          continue;
        const pieces = ref.path.split("/");
        for (let i = 1;i < pieces.length; i++) {
          const path = pieces.slice(0, i).join("/");
          if (!byPath.has(path))
            byPath.set(path, { path, name: pieces[i - 1], directory: true, historical: true });
        }
        if (ref.directory || /\.(md|py|js|ts|sh)$/i.test(ref.path))
          byPath.set(ref.path, { ...byPath.get(ref.path), ...ref, name: pieces.at(-1), historical: true });
      }
      for (const ref of event.removed_refs || []) {
        if (!valid(ref.path))
          continue;
        byPath.delete(ref.path);
        if (ref.directory) {
          for (const path of byPath.keys())
            if (path.startsWith(ref.path + "/"))
              byPath.delete(path);
        }
      }
    }
    return [...byPath.values()].sort((a, b) => a.path.localeCompare(b.path));
  }
  if (typeof window !== "undefined")
    window.OracleReplay = { projectJournal };
})();
