import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: 'https://c212-140-213-129-154.ngrok-free.app'
});

export default instance;
