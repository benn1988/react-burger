import axios from 'axios';

// creating an instance of the axios object with the firebase url as a baseURL
const instance = axios.create({
  baseURL: 'https://react-my-burger-128f9.firebaseio.com/'
});

export default instance;