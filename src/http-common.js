// @ts-check
import axios from 'axios';

export const HTTP = axios.create({
  // baseURL: 'https://cloudhotel.gr/welcome/CommunicationService/'
  baseURL: 'http://localhost:55252/CommunicationService/'
})
