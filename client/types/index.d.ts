import type { AxiosRequestHeaders } from 'axios'

export type Maybe<T> = T | null

export interface AxiosRequest {
  method: string
  params?: any
  data?: any
  headers?: AxiosRequestHeaders
}

// ----------------
// Model
// ----------------

interface User {
  id: number
  name: string
  email: string
}

// ----------------
// State
// ----------------

interface AuthState {
  user: Maybe<User>
}
