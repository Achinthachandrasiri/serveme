import axios from 'axios'


export default axios.create({
    baseURL:'http://localhost:10200/',
    withCredentials: true
})