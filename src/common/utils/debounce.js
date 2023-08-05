// call the function just one time, after setTimeout ms

function debounce(func, ms) {
    let timer;
    return _ => {
        clearTimeout(timer) // same function call would be canceled
        timer = setTimeout(_ => {
            timer = null // init timer after setTimeout
            func.apply(this, arguments) // apply: deliver the functions's this & arguments
        }, ms)
    }
}

export default debounce