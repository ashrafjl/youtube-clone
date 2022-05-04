import axios from "axios";

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params:{
        key: "AIzaSyBSGvWCJoNEjOz1XyqL7gsMzqwRPvtp3r8",
    },
})
export default request;