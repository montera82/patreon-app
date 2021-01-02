import {Browser, Page} from 'puppeteer'

export default  interface PatreonInterface  {
  patreonLoginUrl: string | undefined
  patreonProfileUrl: string | undefined

  scrap(options: ScrapPatreonOptions): Promise<ScrapPatreonResponse>
}

export interface ScrapPatreonOptions {
  email: string,
  password: string
}

export interface ScrapPatreonResponse {
  patrons: number,
  per_month: number
}