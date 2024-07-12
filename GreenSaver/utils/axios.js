import axios from "axios";

const instance = axios.create({
    baseURL: 'https://f77f-180-252-169-191.ngrok-free.app'
});

export default instance;