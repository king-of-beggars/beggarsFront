function commaOnThree(number) {
    const conditionChk = typeof(number) === "number"
    if (conditionChk) {
        const punctuatedNum = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return punctuatedNum
    }
}

export default commaOnThree