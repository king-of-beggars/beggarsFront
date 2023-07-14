const defaultRatio = 0.9;

// 가계부 ::: datepicker 박스 크기 결정
export function getDateBoxSize(isMobile, frameSize, screenWidth, cashbookDateBox, boardBtnSleep) {
    const dateBoxWidth =
        isMobile || screenWidth < frameSize.width
        ? ((screenWidth * cashbookDateBox.width) / frameSize.width) * defaultRatio
        : ((frameSize.width * cashbookDateBox.width) / frameSize.width) * defaultRatio
    const dateBoxHeight = dateBoxWidth * (boardBtnSleep.height / boardBtnSleep.width);

    return { dateBoxWidth, dateBoxHeight }
}

// 메인 ::: 기본 카드(mainRecordCard) 크기 결정
export function getAssetSize(frameSizeObj, screenWidth, assetSizeObj) {
    if (frameSizeObj.width <= screenWidth) {
        return { width: assetSizeObj.width * defaultRatio, height: assetSizeObj.height * defaultRatio}
        // return assetSizeObj
    } else {
        const ratio = (screenWidth / frameSizeObj.width) * defaultRatio
        const width = Math.ceil(ratio * assetSizeObj.width)
        const height = Math.ceil(ratio * assetSizeObj.height)
        // test code
        // console.log("will return:::", {width, height})
        return { width, height }
    }
}