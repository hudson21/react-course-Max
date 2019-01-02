import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-b39ed.firebaseio.com/'
});

export default instance; 