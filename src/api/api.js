import axios from "axios";

const instance = axios.create({
  method: "options",
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": `application/json`,
    // 'Access-Control-Request-Headers': 'Cookie',
  },
});


export const AuthAPI = {
  postNickCheck: (payload) => instance.post("/api/user/nickCheck", payload),
  postIdCheck: (payload) => instance.post("/api/user/idCheck", payload),
  postSignUp: (payload) => instance.post("/api/user/signup", payload),
  postLogIn: (payload) => instance.post("/api/user/login", payload),
  postNickSocial: (payload) => instance.post("/api/user/signup/social", payload),
  postLogout: () => instance.post("/api/user/logout")
};

export const CashBookAPI = {
  getCashCard: (date) => instance.get(`/api/cashbook?date=${date}`),
  getCashDetail: (id) => instance.get(`/api/cashbook/${id}`),
  postCardAdd: (payload) => instance.post('/api/cashbook/frame', payload),
  postCashDetailAdd: ({cardId, newDetail}) => instance.post(`/api/cashbook/${cardId}`, newDetail),
  postCashEdit: ({cardId, newCard}) => instance.post(`/api/cashbook/frame/${cardId}`, newCard)
}

export const boardAPI = {
  getBoastList: async () => await instance.get("/api/board/goodjob", {
    params: {
      limit: 15,
      page: 1
    }
  }),
  getScoldedList: async () => await instance.get("/api/board/noway", {
    params: {
      limit: 15,
      page: 1
    }
  }),
  getBoardDetail: async (boardId) => await instance.get(`/api/board/detail/${boardId}`)
}

export default instance;
