import { getHttpRequest, sendHttpRequest } from '@/services/httpService'

export const fetchItemsByCategory = async asset => {
  return await getHttpRequest(`/asset-management/${asset}.json`)
}

export const postItemsByCategory = async asset => {
  return await sendHttpRequest(`/asset-management/${asset}.json`)
}
