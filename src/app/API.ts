import axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'https://hoops-to-glory-server.vercel.app/'; // Update with your backend server URL

// Create an Axios instance with custom configurations
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define types for request data and response data
export interface Time {
  _id: string;
  username: string;
  elapsedTime: string;
}


// API functions
export const createTime = async (timeData: { username: string, elapsedTime: string }): Promise<Time> => {
  try {
    const response: AxiosResponse<Time> = await api.post('/times/create', timeData);
    return response.data;
  } catch (error) {
    throw error; // Throw the error message from the server
  }
};

export const getTimeById = async (timeId: string): Promise<Time | null> => {
  try {
    const response: AxiosResponse<{ time: Time }> = await api.get(`/times/get/${timeId}`);
    return response.data.time;
  } catch (error) {
    if (error === 404) {
      return null;
    }
    throw error; // Throw other errors
  }
};

export const getAllTimes = async (): Promise<Time[]> => {
  try {
    const response: AxiosResponse<{ times: Time[] }> = await api.get('/times/get');
    return response.data.times;
  } catch (error) {
    throw error;
  }
};

export const getTimeByUsername = async (username: string): Promise<Time | null> => {
  try {
    const response: AxiosResponse<{ time: Time }> = await api.get(`/times/get-by-username/${username}`);
    return response.data.time;
  } catch (error:any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};


export const updateTime = async (timeId: string, timeData: { username: string, elapsedTime: string }): Promise<Time> => {
  try {
    const response: AxiosResponse<Time> = await api.patch(`/times/update/${timeId}`, timeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTime = async (timeId: string): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse<{ time: Time; message: string }> = await api.delete(`/times/delete/${timeId}`);
    return { message: response.data.message };
  } catch (error) {
    throw error;
  }
};
