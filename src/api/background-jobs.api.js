import { getHttpRequest } from '@/services'

export const fetchBackgroundJobs = async () => {
  return await getHttpRequest('/activity-background-jobs.json')
}
