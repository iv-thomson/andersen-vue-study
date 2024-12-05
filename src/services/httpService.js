const baseUrl = `${import.meta.env.BASE_URL}api`

export const getHttpRequest = async endpoint => {
  const response = await fetch(baseUrl + endpoint)

  return response.json()
}

export const sendHttpRequest = async (endpoint, data) => {
  const response = await fetch(baseUrl + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}
