import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Replace with your actual backend URL
// For physical Android device, use your computer's IP address
// For Android Emulator, use 10.0.2.2
// For iOS Simulator, use localhost
const API_BASE_URL = "http://192.168.0.240:3000/api";

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
  saveFCMToken: (token: string) => {
    return api.post("/notifications/register-token", { token });
  },
};

export default api;
