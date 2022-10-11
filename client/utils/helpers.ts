import _route, { Config } from 'ziggy-js'
import type { RouteParamsWithQueryOverload, RouteParams } from 'ziggy-js'
import { Ziggy } from '@/routes'

export const route = (name: string, params: RouteParamsWithQueryOverload | RouteParams = {}, absolute: boolean = false): string => {
  return _route(name, params, absolute, Ziggy as Config)
}
