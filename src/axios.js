import axios from "axios";

const instance = axios.create({
    baseURL: "https://us-central1-oba-dce9d.cloudfunctions.net/api"
    
    // baseURL: "http://localhost:5001/oba-dce9d/us-central1/api"
});

export default instance;