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

export function getNewAssetSize(assetSize, ratio) {
    if (typeof(assetSize) === "object") {
        return { width: Math.ceil(assetSize.width * ratio), height: Math.ceil(assetSize.height * ratio) }
    } else if (typeof(assetSize) === "number") {
        return Math.ceil(assetSize * ratio)
    }
}


// 일단 common으로 옮기고, 가계부와 메인의 function을 getNewAssetSize로 대체할 수 없는 경우 분리