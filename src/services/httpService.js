const baseUrl = `${import.meta.env.BASE_URL}/api`

export const getHttpRequest = async (endpoint) => {
  const response = await fetch(baseUrl + endpoint)
  
  return response.json()
};
