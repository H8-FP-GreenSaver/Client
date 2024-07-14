import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: 'https://8bb5-36-69-185-169.ngrok-free.app'
});

export default instance;
