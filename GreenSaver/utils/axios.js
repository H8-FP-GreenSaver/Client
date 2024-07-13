import axios from "axios";

const instance = axios.create({
//   baseURL: "http://localhost:3000",
  baseURL: 'https://72f1-2001-448a-2082-7a0e-c190-6dc6-db8f-1632.ngrok-free.app'
});

export default instance;
