import { getHttpRequest } from '@/services'

export const fetchServiceTicketReporting = async () => {
  try {
    return await getHttpRequest('/service-ticket-reporting.json')
  } catch (error) {
    console.error('Data fetching error:', error)
  }
}
