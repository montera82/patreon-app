export interface UserInterface {
  id: number
  name: string
  patreon_email: string
  patreon_password: string
  patreon_last_scrap: string
}

export interface PatreonInterface {
  id: number
  user_id: number
  patrons: number
  per_month: number
}

export interface MutationResponseInterface {
  code: String
  success: Boolean
  message: String
  [key: string]: any
}

export interface NewUserInterface {
  name: string
  patreonEmail: string
  patreonPassword: string
}

export interface SignupArgsInterface {
  input: NewUserInterface,
  [key: string]: any
}