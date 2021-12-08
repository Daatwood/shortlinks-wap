import axios from 'axios';
import settings from '../data/settings.json';

export const host = 'https://'+settings.domain;
export const api = 'https://'+settings.api;

const options = {
  baseURL: settings.api,
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
};

const server = () => {
  return axios.create(options);
};
export default server;