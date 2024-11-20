import { getHttpRequest } from '@/services';

export const fetchDataUsage = async () => {
  return await getHttpRequest('/data-usage/data-usage.json');
};

export const fetchKeyFigures = async (filter = 'All') => {
  return await getHttpRequest(`/data-usage/key-figures.json?filter=${filter}`);
};
