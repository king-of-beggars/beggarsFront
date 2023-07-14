// main
//// day 기록 표시
export const commentDayAfter = ["님이 road to 거지왕에 합류한지", "일 째!"]
//// 메인 카드에 노출할 멘트
//// 긍정 (절약 성공)
export const positiveComments = [
    "하하 이런이런, 벌써부터 기강을 잡는겐가?",
    "이제 거지왕이라는 칭호는 지루하겠군.",
    "어떤가 세상을 다 가진 기분이?",
    "거지왕의 무게를 견디는 자가 나타났군!",
    "자네, 거지왕의 행보에 동참하게 되었군!",
    "이젠 제법 왕좌가 익숙해 보이는군 그래~"
]
//// 부정 (절약 실패)
export const negativeComments = [
    "이러면서 먹고살기 힘들다고?",
    "하하, 혹시 자네 뭐 되는가?",
    "‘거지왕’이 진짜 상거지를 일컫는 말은 아니라네.",
    "이러다가는 정말 탈탈 다 털리겠어...",
    "괜찮네. 오늘부터 굶으면 되지, 안 그런가?",
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