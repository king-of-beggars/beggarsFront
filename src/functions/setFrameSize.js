function setFrameSize() {
    const [frameWidth, frameHeight] = [393, 852]
    try {
        localStorage.setItem("frameWidth", frameWidth)
        localStorage.setItem("frameHeight", frameHeight)
        console.log("setFrame: true")
    } catch (e) {
        console.log("setFrame error:::", e)
    }    
}

export default setFrameSize