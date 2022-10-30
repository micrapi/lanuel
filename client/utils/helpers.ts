import { RouteLocationNormalizedLoaded } from 'vue-router'
import _route, { Config } from 'ziggy-js'
import type { RouteParamsWithQueryOverload, RouteParams } from 'ziggy-js'
import { Ziggy } from '@/routes'

export const route = (name: string, params: RouteParamsWithQueryOverload | RouteParams = {}, absolute: boolean = false): string => {
  return _route(name, params, absolute, Ziggy as Config)
}

export const isRoute = (route: RouteLocationNormalizedLoaded, name: string, exact: boolean = false): boolean => {
  const routeName = route.name?.toString()

  return routeName && (routeName === name || (!exact && routeName.startsWith(`${name}-`)))
}

export const isAdminRoute = (route: RouteLocationNormalizedLoaded): boolean => {
  return isRoute(route, 'admin')
}
