import { getHttpRequest } from '@/services'

export const fetchServiceTicketReporting = async () => {
  return await getHttpRequest('/service-ticket-reporting.json')
}
