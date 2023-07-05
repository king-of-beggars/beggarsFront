function getFrameSize() {
    let frameWidth = localStorage.getItem("frameWidth")
    let frameHeight = localStorage.getItem("frameHeight")
    if (!!frameWidth === false || !!frameHeight === false) {
        throw new Error("error in getFrameSize(): No frameWidth or frameHeight in localstorage.")
    } else {
        return { frameWidth: parseFloat(frameWidth), frameHeight: parseFloat(frameHeight)}
    }
}

export default getFrameSize