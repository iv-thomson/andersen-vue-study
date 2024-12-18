import { getHttpRequest } from '@/services'

export const fetchMonthlyBilling = async () => {
  return await getHttpRequest('/montly-billing/montly-billing.json')
}

export const fetchInfoPanelsData = async () => {
  return await getHttpRequest('/montly-billing/info-panels-data.json')
}

export const fetchSmartphonesData = async () => {
  return await getHttpRequest('/montly-billing/smartphones.json')
}
