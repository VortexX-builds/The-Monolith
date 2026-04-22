uniform float uTime;
uniform vec2 uMouse;
uniform float uPixelRatio;
uniform float uSize;

attribute float aSize;

void main() {
  vec3 pos = position;

  // Organic wave displacement
  float wave = sin(pos.x * 0.5 + uTime * 0.8) * cos(pos.z * 0.5 + uTime * 0.6);
  pos.y += wave * 0.3;
  pos.x += sin(pos.z * 0.3 + uTime * 0.5) * 0.15;

  // Mouse repulsion in NDC space
  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  vec4 clipPos = projectionMatrix * mvPos;
  vec2 ndc = clipPos.xy / clipPos.w;

  vec2 diff = ndc - uMouse;
  float dist = length(diff);
  float repulse = smoothstep(0.25, 0.0, dist);
  vec2 dir = (dist > 0.001) ? (diff / dist) : vec2(0.0);
  pos.x += dir.x * repulse * 0.4;
  pos.y += dir.y * repulse * 0.4;

  vec4 finalMVPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * finalMVPos;
  gl_PointSize = aSize * uSize * uPixelRatio * (1.0 / -finalMVPos.z);
}
