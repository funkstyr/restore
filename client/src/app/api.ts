import axios from 'axios';

// using weird bypass that could be done by webpack-dev-server or api config
// visit https://cors-anywhere.herokuapp.com/corsdemo to get access
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// const api = axios.create({
//   baseURL: 'https://staging.websoftdev.com/ndwrmetersapi/',
//   timeout: 10000,
// });

export default api;
