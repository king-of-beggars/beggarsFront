const ifNotLoggedIn = '여기는 로그인이 필요하다네!'; // 비로그인시 노출할 코멘트

const ifLoading = '데이터를 받아오는 중'; // 데이터 로딩중에 노출할 코멘트

const ifError = '데이터를 받아오는데 실패했다네...'; // 데이터 로딩 실패시 노출할 코멘트

const commentDayAfter = ['님이 road to 거지왕에 합류한지', '일 째!']; // day 기록 표시

const positiveComments = [
  '하하 이런이런, 벌써부터 기강을 잡는겐가?',
  '이제 거지왕이라는 칭호는 지루하겠군.',
  '어떤가 세상을 다 가진 기분이?',
  '거지왕의 무게를 견디는 자가 나타났군!',
  '자네, 거지왕의 행보에 동참하게 되었군!',
  '이젠 제법 왕좌가 익숙해 보이는군 그래~',
]; // 긍정 (절약 성공) - 메인 카드에 노출할 멘트

const negativeComments = [
  '이러면서 먹고살기 힘들다고?',
  '하하, 혹시 자네 뭐 되는가?',
  '‘거지왕’이 진짜 상거지를 일컫는 말은 아니라네.',
  '이러다가는 정말 탈탈 다 털리겠어...',
  '괜찮네. 오늘부터 굶으면 되지, 안 그런가?',
]; // 부정 (절약 실패) - 메인 카드에 노출할 멘트

const welcomeComments = [
  '거지왕의 여정에 합류한 것을 환영한다네!',
  '못 보던 얼굴이군! 어서 들어오게!',
  '으음~ 뉴비의 상콤한 기운이 느껴지네!',
  '열심히 절약하면, 언젠가 거지왕이 될 수 있지!',
]; // 뉴비 환영 - 메인 카드에 노출할 멘트

const commentDetailDelete = ['진정으로 ', '이 기록을 지울텐가?']; // 지출 기록 삭제 멘트
const commentZeroSpend = ['무지출 데이라고...?', 'ㅅ,,사실인가?!']; // 무지출 등록 멘트
const commentGoBoard = '벽보보러 가시게'; // 게시글 이동 멘트
const commentGray = [
  ['장부는 5개까지만', '만들 수 있소'],
  ['왼쪽으로 밀어서', '장부 추가'],
];
const commentDeleteCard = ['이 장부를 정말로', '지워버릴 텐가?']; // 카드 삭제 멘트

const commentDataNone = ['장부에 기록을 해야만', '벽보를 붙힐 수 있다네.']; // 기록 유도 멘트

const commentBoardLogin = ['진정으로', '우리와 함께 하겠는가?']; // 로그인 유도 멘트

const commentBoardDelete = ['이 댓글을 정말로', '지워버릴 텐가?']; // 댓글 삭제 멘트

export const COMMENT = {
  ifNotLoggedIn,
  ifLoading,
  ifError,
  commentDayAfter,
  positiveComments,
  negativeComments,
  welcomeComments,
  commentDetailDelete,
  commentZeroSpend,
  commentGoBoard,
  commentGray,
  commentDeleteCard,
  commentDataNone,
  commentBoardLogin,
  commentBoardDelete,
};
