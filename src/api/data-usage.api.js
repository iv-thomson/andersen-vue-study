import { getHttpRequest } from '@/services';

export const fetchDataUsage = async () => {
  return await getHttpRequest('/data-usage/data-usage.json');
};

export const fetchKeyFigures = async () => {
  return await getHttpRequest('/data-usage/key-figures.json');
};
