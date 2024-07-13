import axios from "axios";

const instance = axios.create({
//   baseURL: "http://localhost:3000",
  baseURL: 'https://3893-180-252-169-191.ngrok-free.app'
});

export default instance;
