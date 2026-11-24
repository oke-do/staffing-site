/** Prefix public/ paths with the site's base URL (needed on GitHub Pages). */
export const asset = (path: string): string => import.meta.env.BASE_URL + path.replace(/^\//, '')
