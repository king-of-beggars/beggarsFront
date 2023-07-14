// main
//// day 기록 표시
export const commentDayAfter = ["님이 road to 거지왕에 합류한지", "일 째!"]
//// 메인 카드에 노출할 멘트
//// 긍정 (절약 성공)
export const positiveComments = [
    "하하 이런이런, 벌써부터 기강을 잡는겐가?",
]
//// 부정 (절약 실패)
export const negativeComments = [
    "이런데 먹고살기가 힘들다고?...",
]



// cashbook
//// 지출 기록 삭제 멘트
export const commentDetailDelete = ["진정으로 ", "이 기록을 지울텐가?"];
//// 무지출 등록 멘트
export const commentZeroSpend = ["무지출 데이라고...?", "ㅅ,,사실인가?!"];
//// 게시글 이동 멘트
export const commentGoBoard = "벽보보러 가시게"
//// 추가 회색 박스 멘트
export const commentGrayAdd = ["왼쪽으로 밀어서", "장부 추가"]
export const commentGrayNope = ["장부는 5개까지만", "만들 수 있소!"]
export const commentGray = (isOver) => {
    return isOver ? (<>장부는 5개까지만<br />만들 수 있소</>) : (<>왼쪽으로 밀어서<br/> 장부 추가</>)
}