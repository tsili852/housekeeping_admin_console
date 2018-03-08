// @ts-check
import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'https://dev-predefined-orders.chb-technologies.ch/api/'
})
