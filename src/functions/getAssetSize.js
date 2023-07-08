
// 가계부 ::: datepicker 박스 크기 결정
export function getDateBoxSize(isMobile, frameSize, screenWidth, cashbookDateBox, boardBtnSleep) {
    const dateBoxWidth =
        isMobile || screenWidth < frameSize.width
        ? ((screenWidth * cashbookDateBox.width) / frameSize.width) * 0.65
        : ((frameSize.width * cashbookDateBox.width) / frameSize.width) * 0.65;
    const dateBoxHeight = dateBoxWidth * (boardBtnSleep.height / boardBtnSleep.width);

    return { dateBoxWidth, dateBoxHeight }
}


// 메인 ::: 설명 박스(mainExpBox) 크기 결정
export function getMainExpBoxSize(frameSize, screenWidth, mainExpBox) {
    if (frameSize.width === screenWidth) {
        return mainExpBox
    } else {
        const ratio = frameSize.width / screenWidth
        const mainExpBoxWidth = ratio * mainExpBox.width
        const mainExpBoxHeight = ratio * mainExpBox.height
        return { mainExpBoxWidth, mainExpBoxHeight }
    }
}


// 메인 ::: 기본 카드(mainRecordCard) 크기 결정
export function getAssetSize(frameSizeObj, screenWidth, assetSizeObj) {
    if (frameSizeObj.width >= screenWidth) {
        return assetSizeObj
    } else {
        const ratio = frameSizeObj.width / screenWidth
        const width = ratio * assetSizeObj.width
        const height = ratio * assetSizeObj.height
        return { width, height }
    }
}