import AppConstants from '../appConstants.js';

const axiosClient = axios.create({
  baseURL: AppConstants.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    //Response data
    return response.data;
  },
  function (error) {
    //Return error
    return Promise.reject(error);
  }
);

export default axiosClient;
