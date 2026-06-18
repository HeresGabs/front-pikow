/// <reference types="vite/client" />

declare module 'vue-signature-pad' {
  import type { DefineComponent } from 'vue'
  export const VueSignaturePad: DefineComponent<{
    options?: Record<string, unknown>
  }>
  const _default: unknown
  export default _default
}
