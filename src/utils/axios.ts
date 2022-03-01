import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_SAMPLE_API_PATH || '' });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
