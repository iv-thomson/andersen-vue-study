import { getHttpRequest } from '@/services'
export const fetchActivityLog = async () => {
  return await getHttpRequest('/activity-log/activity-log.json')
}
