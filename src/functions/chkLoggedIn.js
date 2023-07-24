export default function chkLoggedIn() {
    const isNickname = !!localStorage.getItem("nickname")
    const isUserId = !!localStorage.getItem("userId")
    console.log("chkLoggedIn:::", isNickname, isUserId)

    return isNickname && isUserId
}