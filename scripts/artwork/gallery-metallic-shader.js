/* Static gallery artwork adapted from @alissa · OpenShaders
 * https://openshaders.com/@alissa
 * Source supplied by the user. Original folded field and halftone passes retained.
 * Monochrome palette, equal channel gamma, fixed render times; no animation loop.
 * Used only to export images. The application displays the resulting WebP files. */
const VERTEX_SHADER = `#version 300 es
void main() {
  vec2 position = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}
`;

const FIELD_SHADER = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform float uLightMode;
uniform vec3 uDarkBackground;
uniform vec3 uLightBackground;
out vec4 fragColor;

const float HUE = 0.15391852;
const float HUE_SPREAD = -0.0122527145;
const float HUE_TRAVEL = 2.23615503;
const float CHROMA = 0.0;
const float LIGHTNESS = 0.541118145;
const float COLOUR_CYCLE = 0.113902129;
const float THETA = 2.13968611;
const float SHEAR = 0.957451522;
const float SHRINK = 0.946693301;
const float LAYERS = 71.0;
const float WARP_FREQ_X = 0.369209826;
const float WARP_FREQ_Y = 2.09564662;
const float WARP_AMP_X = 0.130170748;
const float WARP_AMP_Y = 0.025880659;
const float ASPECT_X = 2.46213293;
const float ASPECT_Y = 0.210679367;
const float OFFSET_X = 0.305075943;
const float OFFSET_Y = 0.0198517106;
const float TILT = -0.130805507;
const float ZOOM = 1.05968642;
const float CENTRE_X = 0.582795501;
const float CENTRE_Y = -0.194862932;
const float GLOW_SIZE = 0.00196824758;
const float FALLOFF = 0.303804129;
const float VIGNETTE = 0.0395006202;
const float FLOW_SPEED = 0.528088868;
const float FLOW_DIRECTION = 1.0;
const float BREATH_RATE = 0.528192759;
const float BREATH_AMOUNT = 0.0920186862;
const float PHASE = 23.9313068;
const float ECHO = 0.392336816;
const float ECHO_SHIFT = 0.128191218;
const float SOFTNESS = 0.00126686099;
const float LIGHT_SWING = 0.304926902;

const float TAU = 6.28318530718;

vec3 oklchToLinear(float L, float C, float h) {
  float a = C * cos(h), b = C * sin(h);
  float l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  float m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  float s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  vec3 lms = vec3(l_, m_, s_);
  lms = lms * lms * lms;
  return mat3(4.0767416621, -1.2684380046, -0.0041960863,
              -3.3077115913, 2.6097574011, -0.7034186147,
              0.2309699292, -0.3413193965, 1.7076147010) * lms;
}

float blueNoise(vec2 p, float frame) {
  p += 5.588238 * mod(frame, 64.0);
  return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
}

void main() {
  vec2 R = iResolution.xy;
  vec2 pos = (gl_FragCoord.xy - 0.5 * R) / R.y;
  float t = iTime * FLOW_SPEED * FLOW_DIRECTION + PHASE;
  float breath = (-sin(iTime * BREATH_RATE * 1.5) + sin(iTime * BREATH_RATE + 1.0)) * 0.25 + 0.5;

  vec2 u = (pos - vec2(CENTRE_X, CENTRE_Y)) * (ZOOM - breath * BREATH_AMOUNT);
  float ct = cos(TILT), st = sin(TILT);
  u = mat2(ct, st, -st, ct) * u;

  mat2 fold = mat2(cos(THETA), sin(THETA), -SHEAR, cos(THETA));

  float hue0 = HUE * TAU;
  float hue1 = hue0 + HUE_SPREAD * TAU;
  vec3 color = vec3(0.0);

  for (float i = 1.0; i <= 96.0; i += 1.0) {
    if (i > LAYERS) break;
    u.x += -sin(u.y * WARP_FREQ_X + t + i * 0.007) * WARP_AMP_X;
    u.y += -sin(u.x * WARP_FREQ_Y - t + i * 0.02) * WARP_AMP_Y;
    u = fold * u * SHRINK;

    vec2 q = u - vec2(OFFSET_X + breath * 0.1, OFFSET_Y);
    vec2 s = vec2(q.x * ASPECT_X, q.y * ASPECT_Y);
    float glow = GLOW_SIZE / (dot(s, s) + SOFTNESS);
#ifndef SKIP_ECHO
    vec2 e = vec2((q.x - ECHO_SHIFT) * ASPECT_X, s.y);
    glow += ECHO * GLOW_SIZE / (dot(e, e) + SOFTNESS);
#endif
    glow *= 0.25 + breath * 0.4;

    float r = length(u);
    float k = sin(i * COLOUR_CYCLE + t * 1.2 + r * HUE_TRAVEL) * 0.5 + 0.5;
    vec3 tint = clamp(oklchToLinear(LIGHTNESS + LIGHT_SWING * k, CHROMA * (0.75 + 0.35 * k), mix(hue0, hue1, k)), 0.0, 1.0);
    color += glow * tint * exp2(-r * FALLOFF);
  }

  vec3 x = max(color, 0.0);
  color = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  color = pow(clamp(color, 0.0, 1.0), vec3(0.92));

  float edge = smoothstep(0.5, 1.6, length(pos));
  color *= 1.0 - edge * VIGNETTE;

  vec3 dark = uDarkBackground + color * (1.0 - uDarkBackground);
  float strength = max(color.r, max(color.g, color.b));
  vec3 light = uLightBackground * (1.0 - strength) + color * 0.96;
  color = mix(dark, light, uLightMode);

  color += (blueNoise(gl_FragCoord.xy, floor(iTime * 24.0)) - 0.5) / 255.0;
  fragColor = vec4(vec3(clamp(dot(color, vec3(0.2126, 0.7152, 0.0722)), 0.0, 1.0)), 1.0);
}
`;

const RARITY_SHADER = `#version 300 es
precision highp float;

uniform sampler2D tScene;
uniform vec2 iResolution;
uniform float iTime;
uniform float uLightMode;
uniform vec3 uDarkBackground;
uniform vec3 uLightBackground;
uniform float uPixelRatio;
out vec4 fragColor;

const float uStrength = 1.15240073;
const float uScale = 0.848909795;
const float uSeed = 0.508090675;

const float TAU = 6.28318530718;
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

vec3 toInk(vec3 c) { return mix(c - uDarkBackground, uLightBackground - c, uLightMode); }
vec3 fromInk(vec3 ink) { return mix(uDarkBackground + ink, uLightBackground - ink, uLightMode); }
vec3 sceneInk(vec2 uv) { return toInk(texture(tScene, clamp(uv, 0.0, 1.0)).rgb); }

float blueNoise(vec2 p, float frame) {
  p += 5.588238 * mod(frame, 64.0);
  return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
}

vec3 halftone(vec2 frag) {
  float cell = max(3.0, uScale * 3.6 * uPixelRatio);
  float angle = 0.26 + uSeed * 0.3;
  mat2 turn = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 rotated = turn * frag;
  vec2 grid = floor(rotated / cell);
  vec2 centre = (grid + 0.5) * cell;
  vec2 source = transpose(turn) * centre;
  vec3 soft = sceneInk(frag / iResolution);
  vec3 ink = sceneInk(source / iResolution);
  float level = clamp(dot(ink, LUMA), 0.0, 1.0);
  float radius = cell * sqrt(pow(level, 0.9) / 3.14159265);
  float dist = length(rotated - centre);
  float aa = 0.7 * uPixelRatio;
  float dot_ = 1.0 - smoothstep(radius - aa, radius + aa, dist);
  vec3 dots = ink * min(0.8 / max(level, 1e-3), 2.2) * dot_;
  float presence = smoothstep(0.03, 0.16, level) * (0.3 + 0.14 * uStrength);
  return mix(soft, dots, presence);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec3 ink = halftone(frag);
  vec3 color = fromInk(clamp(ink, 0.0, 1.0));
  color += (blueNoise(frag, floor(iTime * 24.0)) - 0.5) / 255.0;
  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

function renderMetallicShader(canvas,time=0){
 const gl=canvas.getContext('webgl2',{alpha:false,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:true});
 if(!gl)throw Error('WebGL2 unavailable for artwork export');
 function program(fragment){
  const result=gl.createProgram();
  for(const[type,source]of [[gl.VERTEX_SHADER,VERTEX_SHADER],[gl.FRAGMENT_SHADER,fragment]]){
   const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
   if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));
   gl.attachShader(result,shader);gl.deleteShader(shader);
  }
  gl.linkProgram(result);if(!gl.getProgramParameter(result,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(result));return result;
 }
 const field=program(FIELD_SHADER),post=program(RARITY_SHADER),texture=gl.createTexture(),framebuffer=gl.createFramebuffer();
 gl.bindTexture(gl.TEXTURE_2D,texture);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,canvas.width,canvas.height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
 gl.bindFramebuffer(gl.FRAMEBUFFER,framebuffer);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,texture,0);
 if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('Incomplete artwork framebuffer');
 function frame(program){
  gl.useProgram(program);const at=name=>gl.getUniformLocation(program,name);
  gl.uniform2f(at('iResolution'),canvas.width,canvas.height);gl.uniform1f(at('iTime'),time);gl.uniform1f(at('uLightMode'),0);
  gl.uniform3fv(at('uDarkBackground'),[.015,.015,.015]);gl.uniform3fv(at('uLightBackground'),[1,1,1]);
  return at;
 }
 gl.viewport(0,0,canvas.width,canvas.height);frame(field);gl.drawArrays(gl.TRIANGLES,0,3);
 gl.bindFramebuffer(gl.FRAMEBUFFER,null);const at=frame(post);gl.uniform1f(at('uPixelRatio'),2);
 gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1i(at('tScene'),0);gl.drawArrays(gl.TRIANGLES,0,3);gl.finish();
 const image=canvas.toDataURL('image/webp',.94);
 gl.deleteProgram(field);gl.deleteProgram(post);gl.deleteFramebuffer(framebuffer);gl.deleteTexture(texture);
 return image;
}
window.renderMetallicShader=renderMetallicShader;
