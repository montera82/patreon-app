export interface PatreonServiceInterface  {
  patreonLoginUrl: string | undefined
  patreonProfileUrl: string | undefined

  scrap(options: ScrapPatreonOptions): Promise<ScrapPatreonResponse>
  persistData(data: PatreonData): Promise<PatreonData>
}

export interface ScrapPatreonOptions {
  email: string,
  password: string
}

export interface ScrapPatreonResponse {
  patrons: number,
  per_month: number
}

export interface PatreonData extends ScrapPatreonResponse {
  id?: number,
  user_id: number
}