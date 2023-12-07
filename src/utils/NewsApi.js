import axios from 'axios';
import {newApiKey} from './ApiKey';

const apiBaseUrl = 'https://newsapi.org/v2';

const breakingNewsUrl = `${apiBaseUrl}/top-headlines?country=us&apiKey=${newApiKey}`;
const recommendNewsUrl = `${apiBaseUrl}/top-headlines?country=us&category=business&apiKey=${newApiKey}`;

const discoverNewsUrl = discover =>
  `${apiBaseUrl}/top-headlines?country=us&category=${discover}&apiKey=${newApiKey}`;

const searchNewsUrl = query =>
  `${apiBaseUrl}/everything?q=${query}&apiKey=${newApiKey}`;

const newsApiCall = async (endpoinst, params) => {
  const options = {
    method: 'GET',
    url: endpoinst,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchBreakingNews = async () => {
  return await newsApiCall(breakingNewsUrl);
};

export const fetchRecommendedNews = async () => {
  return await newsApiCall(recommendNewsUrl);
};

export const fetchDiscoverNew = async discover => {
  return await newsApiCall(discoverNewsUrl(discover));
};

export const fetchSearchNews = async query => {
  const endpoint = searchNewsUrl(query);
  return await newsApiCall(searchNewsUrl(endpoint));
};
