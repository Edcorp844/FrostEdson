/* tslint:disable */
/* eslint-disable */
export class Game {
  free(): void;
  [Symbol.dispose](): void;
  set_up_game(): void;
  render_background1(): void;
  render_background2(): void;
  render_background3(): void;
  render_background4(): void;
  constructor(instance_id: number, parent_selector: string, width: number, height: number);
  init(): void;
  debug_log(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_game_free: (a: number, b: number) => void;
  readonly game_debug_log: (a: number) => void;
  readonly game_init: (a: number) => [number, number];
  readonly game_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly game_render_background1: (a: number) => void;
  readonly game_render_background2: (a: number) => void;
  readonly game_render_background3: (a: number) => void;
  readonly game_render_background4: (a: number) => void;
  readonly game_set_up_game: (a: number) => [number, number];
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
