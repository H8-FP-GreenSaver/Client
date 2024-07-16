import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: 'https://fc09-139-228-111-126.ngrok-free.app'
});

export default instance;
