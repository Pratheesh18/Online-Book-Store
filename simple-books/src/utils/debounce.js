export function debounce(func,delay=400){
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        },delay);
    };
}