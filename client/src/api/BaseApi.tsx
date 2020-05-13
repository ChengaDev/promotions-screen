import axios, { AxiosInstance } from 'axios';

const BaseApi = (): AxiosInstance => {
    return axios.create({
        baseURL: 'http://localhost:3100',
        timeout: 3000
    });
};

export default BaseApi;
