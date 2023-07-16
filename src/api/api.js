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
  getBoardDetail: async (boardId) => await instance.get(`/api/board/detail/${boardId}`),
  postBoardComment : ({boardId, newInput}) => instance.post(`/api/board/${boardId}/comment`, newInput),
  deleteBoardComment : ({boardId, commentId}) => instance.delete(`/api/board/${boardId}/comment/${commentId}`),
  postLikeComment : (commentId) => instance.post(`/api/like/${commentId}`)
}

export default instance;
