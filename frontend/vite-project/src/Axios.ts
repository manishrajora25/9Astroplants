import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:4000/api", 
  withCredentials: true, 
});

export default Instance;
