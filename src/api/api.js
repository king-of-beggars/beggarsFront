import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    withCredentials: true,
    "Content-Type": `application/json`,
  },
});

// // request token 저장 방식 수정 할 것
// // cache storage 사용
// instance.interceptors.request.use(
//   function (config) {
//     if (!!localStorage.getItem("accessToken")) {
//       const accessToken = localStorage.getItem("accessToken");
//       const refreshToken = localStorage.getItem("refreshToken");

//       config.headers.accessToken = `Bearer ${accessToken ? accessToken : ""}`;
//       config.headers.refreshToken = `Bearer ${refreshToken ? refreshToken : ""}`;
//     }
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     console.log("request error", error);
//     return Promise.reject(error);
//   }
// );

// // response access/refresh token 변경 적용
// instance.interceptors.response.use(
//   function (response) {
//     if (response.headers.Loginsuccess === false) {
//       localStorage.setItem('test', false);
//     }
//     console.log(response.headers);
//     return response;
//   },

//   function (error) {
//     console.log("인터셉트 응답 못받았어요...ㅠㅠ");
//     return Promise.reject(error);
//   }
// );

export const AuthAPI = {
  postNickCheck: (payload) => instance.post("/api/user/nickCheck", payload),
  postIdCheck: (payload) => instance.post("/api/user/idCheck", payload),
  postSignUp: (payload) => instance.post("/api/user/signup", payload),
  postLogIn: (payload) => instance.post("/api/user/login", payload),
  postNickSocial: (payload) => instance.post("/api/user/signup/social", payload),
  postLogout: () => instance.post("/api/user/logout")
};

export const CashBookAPI = {
  getCashCard: (date) => instance.post(`/api/cashbook?date=${date}`)
}

export const boardAPI = {
  getBoastList: async () => await instance.get("/api/board/goodjob", {
    params: {
      limit: 15,
      page: 1
    }
  })
}

export default instance;
