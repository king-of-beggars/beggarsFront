// common
//// 비로그인시 노출할 코멘트
export const ifNotLoggedIn = "여기는 로그인이 필요하다네!"
//// 데이터 로딩중에 노출할 코멘트
export const ifLoading = "데이터를 받아오는 중"
//// 데이터 로딩 실패시 노출할 코멘트
export const ifError = "데이터를 받아오는데 실패했다네..."

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
//// 뉴비 환영
export const welcomeComments = [
    "거지왕의 여정에 합류한 것을 환영한다네!",
    "못 보던 얼굴이군! 어서 들어오게!",
    "으음~ 뉴비의 상콤한 기운이 느껴지네!",
    "열심히 절약하면, 언젠가 거지왕이 될 수 있지!",
]

// cashbook
//// 지출 기록 삭제 멘트
export const commentDetailDelete = ["진정으로 ", "이 기록을 지울텐가?"];
//// 무지출 등록 멘트
export const commentZeroSpend = ["무지출 데이라고...?", "ㅅ,,사실인가?!"];
//// 게시글 이동 멘트
export const commentGoBoard = "벽보보러 가시게"
//// 추가 회색 박스 멘트
export const commentGray = (isOver) => {
    return isOver ? (<>장부는 5개까지만<br />만들 수 있소</>) : (<>왼쪽으로 밀어서<br/>장부 추가</>)
}
//// 카드 삭제 멘트
export const commentDeleteCard = ["이 장부를 정말로", "지워버릴 텐가?"]
//// 기록 유도 멘트
export const commentDataNone = ["장부에 기록을 해야만", "벽보를 붙힐 수 있다네."]


// board
//// 로그인 유도 멘트
export const commentBoardLogin = ["진정으로", "우리와 함께 하겠는가?"]
//// 댓글 삭제 멘트
export const commentBoardDelete = ["이 댓글을 정말로", "지워버릴 텐가?"]