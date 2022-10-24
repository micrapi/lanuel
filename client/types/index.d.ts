import type { SearchParams } from 'ohmyfetch'

export type Maybe<T> = T | null

export type FetchBody = RequestInit['body'] | Record<string, any>

export interface FetchRequest {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  params?: SearchParams
  body?: FetchBody
  headers?: HeadersInit
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
  fetched: boolean
}
