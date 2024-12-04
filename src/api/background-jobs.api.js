import { getHttpRequest } from '@/services'

export const fetchBackgroundJobs = async () => {
  try {
    return await getHttpRequest('/activity-background-jobs.json')
  } catch (error) {
    console.error('Data fetching error:', error)
  }
}
