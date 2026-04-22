# Skill: WebGL (React Three Fiber + Three.js)

## Scene Structure

- Each R3F scene lives in its own component file under `src/components/webgl/` or a co-located `webgl/` folder.
- The `<Canvas>` element is owned by the parent layout component. Scene content is passed as children or composed via a dedicated scene component.
- Use `<Suspense>` with a fallback for any async asset loading (textures, models, fonts).

## Shader Authoring

- Write shaders as `.glsl` files co-located with the component that uses them, imported as raw strings (`?raw` in Vite).
- Use `shaderMaterial` from Drei for reusable custom materials.
- Prefix uniform names with `u` and varying names with `v` for clarity.
- Always declare `precision mediump float;` in fragment shaders unless high precision is required.

## Performance Rules

- **Dispose on unmount.** Every geometry and material created imperatively must be disposed:

```js
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
  };
}, []);
```

- **`useFrame` efficiency.** Only mutate refs inside `useFrame` — never setState. Keep the callback lean; offload heavy calculations outside the loop.
- **No object creation inside `useFrame`.** Do not instantiate `new Vector3()`, `new Matrix4()`, etc. inside the render loop. Create them once outside and mutate in place.
- Use `instancedMesh` for repeated geometry.
- Use `dpr={[1, 1.5]}` on `<Canvas>` to cap pixel ratio on high-DPI screens.

## Drei Helpers

Prefer Drei utilities over manual Three.js equivalents where available (`useTexture`, `useGLTF`, `Environment`, `MeshTransmissionMaterial`, etc.).

## Integration with GSAP

When animating R3F objects with GSAP, target the `.current` ref of a mesh's `position`, `rotation`, or `scale` directly. Use the `"monolith"` ease. Never animate Three.js object properties through React state.
