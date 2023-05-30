import { environment } from 'src/environments/environments';

export const API_BASE = environment.baseUrl;
export const API_URL = API_BASE + '/api';
export const isDev = true;
export const dafaultTime = 480;
export const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes
