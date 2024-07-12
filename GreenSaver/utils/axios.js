import axios from "axios";

const instance = axios.create({
    baseURL: 'https://42d7-139-228-111-126.ngrok-free.app'
});

export default instance;