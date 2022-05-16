import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const drawer: Writable<string> = writable('');

export const isOpenDrawer: Writable<boolean> = writable(false);
