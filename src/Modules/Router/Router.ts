import Block from "../../components/Block/Block";
import Route from "./Route";

export default class Router {
  private static __instance: Router;
  routes: Route[];
  history: History;
  _currentRoute: Route | null;
  _rootQuery: string;


  constructor(rootQuery: string) {
      if (Router.__instance) {
          return Router.__instance;
      }

      this.routes = [];
      this.history = window.history;
      this._currentRoute = null;
      this._rootQuery = rootQuery;

      Router.__instance = this;
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);

    return this;
  }

  start() {
    window.addEventListener('popstate', (state: PopStateEvent) => {
      this._onRoute((state.currentTarget as Window)?.location.pathname);
    });
    
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
      const route = this.getRoute(pathname);

      if (this._currentRoute && this._currentRoute !== route) {
          this._currentRoute.leave();
      }

      if(route) {
        this._currentRoute = route;
        route.render();
      }
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
      return this.routes.find(route => route.match(pathname));
  }
}

export { Route };