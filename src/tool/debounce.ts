export default function debounce<T>(fn: T, delay: number): () => void {
    let timer: NodeJS.Timeout
    return function (): void {
        const args: any[] = Array.prototype.map.call(arguments, val => val);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            typeof fn === 'function' && fn.apply(null, args);
            clearTimeout(timer);
        }, delay > 0 ? delay : 100);
    };
}