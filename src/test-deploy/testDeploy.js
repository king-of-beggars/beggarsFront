const deployVerification = () => {
    const prevDeploy = localStorage.getItem("curr")
    let currDeploy;
    if (prevDeploy === undefined) {
        currDeploy = 1
    } else {
        currDeploy = parseInt(prevDeploy) + 1
    }

    localStorage.setItem("prev", prevDeploy)
    localStorage.setItem("curr", currDeploy)

    console.log("이전 deploy:::", prevDeploy)
    console.log("현재 deploy:::", currDeploy)

}

export default deployVerification