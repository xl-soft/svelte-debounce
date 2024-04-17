Easy debouncing with Svelte `use:` directive.

```svelte
<input use:debounce={(v) => console.log('debounced value: ', v)}/>
```