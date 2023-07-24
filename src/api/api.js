import axios from "axios";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";

import { saveUserInfo } from 'functions';


const instance = axios.create({
  // method: "options",
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": `application/json`,
    // 'Access-Control-Request-Headers': 'Cookie',
  },
});

// request interceptor
//// 요청이 이루어질 때마다 헤더 설정 : 토큰 변경시에도 항상 최신의 토큰 사용
instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
  config.headers["RefreshToken"] = `${localStorage.getItem("refreshToken")}`;
  return config;
});

// response interceptor
instance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    console.log("interceptor error:::", error.response)
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거
    // 응답 오류가 있는 작업 수행
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // status code가 401인 경우 acesstoken 발급 API
        case 401:
          instance.get("/api/user/refresh").then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken);
          });
          // useGet401();
          break;
        // status code가 403인 경우 로그인 화면으로 이동
        case 403:
          window.location.href = "/login";
          break
          // return <Navigate to={"/login"} replace={true}/>
        default:
          return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  },
)

// const useGet401 = () => {
//   useQuery(['access'], AuthAPI.getAccessToken, {onSuccess: () => {
//     console.log("Bring access token");
//   }})
// }

export const AuthAPI = {
  postNickCheck: (payload) => instance.post("/api/user/nickCheck", payload),
  postIdCheck: (payload) => instance.post("/api/user/idCheck", payload),
  postSignUp: (payload) => instance.post("/api/user/signup", payload),
  postLogIn: (payload) => instance.post("/api/user/login", payload),
  postNickSocial: (payload) => instance.post("/api/user/signup/social", payload),
  postLogout: () => instance.post("/api/user/logout"),
  getSocialUser: () => instance.get("/api/user/login/getInfo"),
  getAccessToken: () => instance.get("/api/user/refresh")
};

export const mainAPI = {
  getMainData: () => instance.get("/api/cashbook/main"),
}

export const CashBookAPI = {
  getCashCard: (date) => instance.get(`/api/cashbook?date=${date}`),
  getCashDetail: (id) => instance.get(`/api/cashbook/${id}`),
  postCardAdd: (payload) => instance.post('/api/cashbook/frame', payload),
  deleteCard: (cardId) => instance.delete(`/api/cashbook/frame/${cardId}`),
  postCashDetailAdd: ({cardId, newDetail}) => instance.post(`/api/cashbook/${cardId}`, newDetail),
  postCashEdit: ({cardId, editCard}) => instance.put(`/api/cashbook/frame/${cardId}`, editCard),
  putCashNone: ({cardId}) => instance.put(`/api/cashbook/${cardId}`),
  deleteCashDetail: (cashDetailId) => instance.delete(`/api/cashbook/${cashDetailId}`),
  postCardBoard: ({cardId, newBoard}) => instance.post(`api/board/${cardId}`, newBoard)
}

export const boardAPI = {
  getBoastList: async (page) => await instance.get("/api/board/goodjob", {
    params: {
      limit: 20,
      page
    }
  }),
  getScoldedList: async (page) => await instance.get("/api/board/noway", {
    params: {
      limit: 20,
      page
    }
  }),
  getBoardDetail: async (boardId) => await instance.get(`/api/board/detail/${boardId}`),
  postBoardComment : ({boardId, newInput}) => instance.post(`/api/board/${boardId}/comment`, newInput),
  deleteBoardComment : ({boardId, commentId}) => instance.delete(`/api/board/${boardId}/comment/${commentId}`),
  postLikeComment : (commentId) => instance.post(`/api/like/${commentId}`)
}

export default instance;
