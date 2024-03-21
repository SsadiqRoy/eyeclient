import axios from 'axios';

import { api_url } from '../utils/env';

export async function getSimple(url, fullurl = 'api') {
  try {
    url = fullurl === 'api' ? `${api_url}${url}` : fullurl;

    const response = await axios({
      method: 'GET',
      withCredentials: true,
      url,
    });

    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export async function getFull(url, fullurl = 'api') {
  try {
    url = fullurl === 'api' ? `${api_url}${url}` : fullurl;

    const response = await axios({
      method: 'GET',
      withCredentials: true,
      url,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export async function postSimple(url, data, fullurl = 'api') {
  try {
    url = fullurl === 'api' ? `${api_url}${url}` : fullurl;

    const response = await axios({
      method: 'POST',
      url,
      data,
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export async function postFull(url, data, fullurl = 'api') {
  try {
    url = fullurl === 'api' ? `${api_url}${url}` : fullurl;

    const response = await axios({
      method: 'POST',
      url,
      data,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export async function patchSimple(url, data, fullurl = 'api') {
  try {
    url = fullurl === 'api' ? `${api_url}${url}` : fullurl;

    const response = await axios({
      method: 'PATCH',
      url,
      data,
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export async function patchFull(url, data, fullurl = 'api') {
  try {
    url = fullurl === 'api' ? `${api_url}${url}` : fullurl;

    const response = await axios({
      method: 'PATCH',
      url,
      data,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export async function deleteRequest(url, fullurl = 'api') {
  try {
    url = fullurl === 'api' ? `${api_url}${url}` : fullurl;

    const response = await axios({
      method: 'DELETE',
      url,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}
