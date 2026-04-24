precision mediump float;

void main() {
  // Circular soft point
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);
  if (dist > 0.5) discard;

  float alpha = smoothstep(0.5, 0.2, dist) * 0.11;
  gl_FragColor = vec4(0.773, 0.776, 0.792, alpha); // #c5c6ca
}
