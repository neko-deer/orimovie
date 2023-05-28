import axios from 'axios';

const apiKey = '0dedff94fec76ae248f29be9ab984eab';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.timeout = 30000;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.params = {
  api_key: apiKey,
};

export default axios;
