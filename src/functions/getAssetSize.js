
// datepicker 박스 크기 결정
export function getDateBoxSize(isMobile, frameSize, screenWidth, cashbookDateBox, boardBtnSleep) {
    const dateBoxWidth =
        isMobile || screenWidth < frameSize.width
        ? ((screenWidth * cashbookDateBox.width) / frameSize.width) * 0.65
        : ((frameSize.width * cashbookDateBox.width) / frameSize.width) * 0.65;
    const dateBoxHeight = dateBoxWidth * (boardBtnSleep.height / boardBtnSleep.width);

    return { dateBoxWidth, dateBoxHeight }
}


