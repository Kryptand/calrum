/// <reference lib="DOM" />
declare module "@vaadin/router" {
  type OptionalPromise<T> = T | Promise<T>;

  export class Context {
    pathname: string;
    search: string;
    hash: string;
    params: any;
    route: Route;
    next: () => Promise<Route | null>;
  }

  export class Commands {
    component: (name: string) => HTMLElement;
    redirect: (
      path: string
    ) => {
      pathname: string;
      from: string;
      params: any;
    };
  }

  export interface RouteAction {
    (context: Context, commmands: Commands): OptionalPromise<
      | void
      | HTMLElement
      | ReturnType<Context["next"]>
      | ReturnType<Commands["component"]>
      | ReturnType<Commands["redirect"]>
    >;
  }

  export interface Route {
    path: string;
    children?: Route[];
    action?: RouteAction;
    redirect?: string;
    bundle?: string;
    component?: string;
    name?: string;
  }

  export class Location {
    baseUrl: string;
    params: any | null;
    pathname: string | null;
    redirectFrom?: string;
    route: Route | null;
    routes: Array<Route | null> | null;
    getUrl(params?: any): string;
  }

  export interface Options {
    baseUrl?: string;
  }

  export interface NavigationTrigger {
    activate(): void;
    inactivate(): void;
  }
  export class Resolver {
    constructor(routes: any, options?: any);

    /**
     * Returns the current list of routes (as a shallow copy). Adding / removing
     * routes to / from the returned array does not affect the routing config,
     * but modifying the route objects does.
     *
     * @return {!Array<!Route>}
     */
    getRoutes(): any;

    /**
     * Sets the routing config (replacing the existing one).
     *
     * @param {!Array<!Route>|!Route} routes a single route or an array of those
     *    (the array is shallow copied)
     */
    setRoutes(routes:any): any;

    /**
     * Appends one or several routes to the routing config and returns the
     * effective routing config after the operation.
     *
     * @param {!Array<!Route>|!Route} routes a single route or an array of those
     *    (the array is shallow copied)
     * @return {!Array<!Route>}
     * @protected
     */
    addRoutes(routes:any): any;

    /**
     * Removes all existing routes from the routing config.
     */
    removeRoutes(): any;
  }
  export class Router extends Resolver {
    constructor(outlet: HTMLElement | null, options?: any);
  }
}
