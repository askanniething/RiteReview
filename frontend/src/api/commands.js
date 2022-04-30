import axios from "axios";
import { BACKEND_URL, BOOKS_API } from "../consts";

const API = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

const BOOKS = axios.create({
  baseURL: BOOKS_API,
});

export const get_user = () => API.get("/getuser");
export const logout_user = () => API.get("/auth/logout");

export const get_all_Users = () => API.get("/user");
export const get_single_user = (id) => API.get(`/user/${id}`);

export const get_all_reviews = () => API.get("/review");
export const add_review = (data) => API.post("/review", data);
export const get_review = (id) => API.get(`/review/${id}`);
export const edit_review = (id, data) => API.put(`/review/${id}`, data);
export const delete_review = (id) => API.delete(`/review/${id}`);
export const get_user_reviews = (userId) => API.get(`/review/user/${userId}`);
export const find_review = (bookId) => API.get(`/review/find/${bookId}`);

export const get_book = (bookId) => BOOKS.get(`/${bookId}`);
export const get_books = (query) => API.get(`/books/${query}`);
export const get_book_reviews = (bookId) => API.get(`/books/book/${bookId}`);
