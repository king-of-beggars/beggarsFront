export default function chkLoggedIn() {
    const isNickname = !!localStorage.getItem("nickname")
    const isUserId = !!localStorage.getItem("userId")

    return isNickname && isUserId
}