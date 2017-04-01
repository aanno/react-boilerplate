
export const ROUTE_PREFIX = process.env.NODE_ENV === 'production' ? "" : "/"
const path = "/api"
export const API_BASE_PATH = process.env.NODE_ENV === 'production' ? path : "http://localhost:8080" + path
