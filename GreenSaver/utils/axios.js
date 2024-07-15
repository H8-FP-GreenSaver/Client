import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: 'https://4ca4-2001-448a-2082-b1f1-5507-267d-3830-df13.ngrok-free.app'
});

export default instance;
