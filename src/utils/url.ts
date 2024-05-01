export const buildQuery = (query: any) => {
  let queryString = ""
  for (const key in query) {
    const value = encodeURIComponent(query[key])
    if (value) {
      queryString += `${key}=${value}&`
    }
  }
  return queryString.slice(0, -1)
}
