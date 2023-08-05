// export default function chkLoggedIn() {
//     if (localStorage.getItem("refreshToken") === undefined || !localStorage.getItem("refreshToken")) {
//         localStorage.clear()
//     }
//     const isNickname = !!localStorage.getItem("nickname")
//     const isUserId = !!localStorage.getItem("userId")
//     const refreshToken = !!localStorage.getItem("refreshToken")

//     console.log("chkLoggedIn:::", isNickname, isUserId, refreshToken)

//     return isNickname && isUserId && refreshToken
// }

export default async function chkLoggedIn() {
    return new Promise((resolve) => {
        if (localStorage.getItem("refreshToken") === undefined && !!localStorage.getItem("accessToken")) {
            localStorage.clear() // 여기서 지워짐
        }
        const isNickname = !!localStorage.getItem("nickname")
        const isUserId = !!localStorage.getItem("userId")
        const refreshToken = !!localStorage.getItem("refreshToken")

        // console.log("chkLoggedIn:::", isNickname, isUserId, refreshToken)

        resolve(isNickname && isUserId && refreshToken);
    });
}

// 추후 쓰인 곳 다 context로 대체하기
