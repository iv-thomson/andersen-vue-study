import { getHttpRequest } from '@/services/httpService'

export const fetchItemsByCategory = async asset => {
  return await getHttpRequest(`../../public/api/asset-management/${asset}.json`)
}
