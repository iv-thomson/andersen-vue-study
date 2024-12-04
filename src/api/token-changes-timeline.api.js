import { getHttpRequest } from '@/services'

export const fetchTokenChangesTimeline = async () => {
  try {
    return await getHttpRequest('/token-changes-timeline.json')
  } catch (error) {
    console.error('Data fetching error:', error)
  }
}
