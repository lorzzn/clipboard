export function getBaseUrl() {
  let url
  if (typeof window !== "undefined")
    // browser should use relative path
    url = ""
  else if (process.env.VERCEL_URL)
    // reference for vercel.com
    url = process.env.VERCEL_URL
  else if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    url = `${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  // assume localhost
  else url = `localhost:${process.env.PORT ?? 3000}`
  return "http://" + url
}
