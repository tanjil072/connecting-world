import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Replace with your actual backend URL
const API_BASE_URL = "http://localhost:3000/api"; // Change this to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  signup: (email: string, password: string, username: string) => {
    return api.post("/auth/signup", { email, password, username });
  },
  login: (email: string, password: string) => {
    return api.post("/auth/login", { email, password });
  },
};

// Posts API
export const postsAPI = {
  createPost: (content: string) => {
    return api.post("/posts", { content });
  },
  getPosts: (page: number = 1, limit: number = 10, username?: string) => {
    const params: any = { page, limit };
    if (username) {
      params.username = username;
    }
    return api.get("/posts", { params });
  },
  getPostById: (postId: string) => {
    return api.get(`/posts/${postId}`);
  },
  likePost: (postId: string) => {
    return api.post(`/posts/${postId}/like`);
  },
  unlikePost: (postId: string) => {
    return api.post(`/posts/${postId}/like`);
  },
  getComments: (postId: string) => {
    return api.get(`/posts/${postId}/comments`);
  },
  commentOnPost: (postId: string, content: string) => {
    return api.post(`/posts/${postId}/comment`, { content });
  },
};

// Notifications API
export const notificationsAPI = {
  saveFCMToken: (fcmToken: string) => {
    return api.post("/notifications/token", { fcmToken });
  },
};

export default api;
