import axios from 'axios';

//Create an instance
const instance = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;