/**
 * # use:debounce
 * Easy debouncing with Svelte `use:` directive.
 * 
 * ```svelte
 * <input use:debounce={(v) => console.log('debounced value: ', v)}/>
 * ```
 */
export function debounce(node: any, callback: <T = any>(value: T) => void, options: { delta: number } = { delta: 100 }): { destroy: () => void } {
    let debounced_value = ''
    let debouncing_delta = 0
    let debouncing_timer: any

    let debouncing_calc = () => { 
        if (debouncing_delta !== 0) { 
            debouncing_delta-- 
        } else {
            debouncing_delta = 0
            debounced_value = node.value;
            clearInterval(debouncing_timer)
            debouncing_timer = undefined
            callback(debounced_value)
        }
    }

    const debouncing_update = () => {
        if (debouncing_timer == null) debouncing_timer = setInterval(debouncing_calc, 1)
        debouncing_delta = options.delta
    }
    node.addEventListener('input', debouncing_update)
    return { destroy: () => node.removeEventListener('input', debouncing_update) }
}