export default function chkLoggedIn() {
    if (localStorage.getItem("refreshToken") === undefined || !localStorage.getItem("refreshToken")) {
        localStorage.clear()
    }
    const isNickname = !!localStorage.getItem("nickname")
    const isUserId = !!localStorage.getItem("userId")
    const refreshToken = !!localStorage.getItem("refreshToken")

    console.log("chkLoggedIn:::", isNickname, isUserId, refreshToken)

    return isNickname && isUserId && refreshToken
}