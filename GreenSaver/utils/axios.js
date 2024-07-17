import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  // baseURL: 'https://eae0-2404-c0-5c40-00-4eb-f49c.ngrok-free.app'
  baseURL: "https://greensaver.welferdinand.online/"
});

export default instance;
