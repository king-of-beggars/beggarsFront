  // 토큰 저장 함수
const saveUserInfo = (userId, nickname) => {
    localStorage.setItem("userId", userId)
    localStorage.setItem("nickname", nickname)
}

export default saveUserInfo