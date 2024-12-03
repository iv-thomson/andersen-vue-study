import { getHttpRequest } from '@/services/httpService'

export const fetchItemsByCategory = async asset => {
  return await getHttpRequest(`/asset-management/${asset}.json`)
}
