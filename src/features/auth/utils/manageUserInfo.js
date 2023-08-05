// 두 방식 중 어떤게 더 나은지 모르겠다...

export const manageUserInfo = {
    store(userObject) {
        const keys = Object.keys(userObject)
        keys.forEach(key => {
            localStorage.setItem(key, userObject[key])
        })
        console.log("userInfo stored")
    },

    check(checkKeys) {
        return checkKeys.every(key => !!localStorage.getItem(key))
    }
}

// export const storeUserInfo = (userObject) => {
//     const keys = Object.keys(userObject)
//     keys.forEach(key => {
//         localStorage.setItem(key, userObject[key])
//     })
//     console.log("userInfo stored")
// }

// export const checkUserInfo = (checkKeys) => {
//     return checkKeys.every(key => !!localStorage.getItem(key))
// }