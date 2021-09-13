import axios from 'axios';
import settings from '../data/settings.json';

export const base = 'https://'+settings.domain;

const options = {
  baseURL: settings.domain,
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
};

const server = () => {
  return axios.create(options);
};
export default server;