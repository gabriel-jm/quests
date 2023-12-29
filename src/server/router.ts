export type RouteFunction = (request: Request) => Promise<Response> | Response

export class Router {
  routes = new Map<string, RouteFunction[]>()

  get(path: string, ...routeHandlers: RouteFunction[]) {
    this.routes.set(`get::${path}`, routeHandlers)
    return this
  }

  post(path: string, ...routeHandlers: RouteFunction[]) {
    this.routes.set(`post::${path}`, routeHandlers)
    return this
  }

  put(path: string, ...routeHandlers: RouteFunction[]) {
    this.routes.set(`put::${path}`, routeHandlers)
    return this
  }

  patch(path: string, ...routeHandlers: RouteFunction[]) {
    this.routes.set(`patch::${path}`, routeHandlers)
    return this
  }

  delete(path: string, ...routeHandlers: RouteFunction[]) {
    this.routes.set(`delete::${path}`, routeHandlers)
    return this
  }

  async handleRoute(req: Request) {
    const { pathname } = new URL(req.url)
    const handlerKey = `${req.method.toLowerCase()}::${pathname}`
    const handlers = this.routes.get(handlerKey)

    if (!handlers || !handlers?.length) {
      return null
    }

    for (const handler of handlers) {
      const response = await handler(req)

      if (response instanceof Response) {
        return response
      }
    }
  }
}
