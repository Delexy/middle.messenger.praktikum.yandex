import { expect } from "chai";
import { Router } from "./Router";
import Block from "../../components/Block/Block";

describe("Router ", () => {
  it("after 'use' method 'routes' length === 1", () => {
		Router.routes = [];
    Router.use("/", Block);
    expect(Router.routes.length).to.equal(1);
  });

  it("after 'go' method pathname correct", () => {
		Router.routes = [];
    const pathname = "/test";
    Router.use(pathname, Block);
    Router.go(pathname);
    expect(Router._currentRoute?._pathname).to.equal(pathname);
  });

  it("method 'getRoute' find correct Route", () => {
		Router.routes = [];
    Router.use("/", Block);
    Router.use("/new", Block);
    Router.use("/test", Block);
    expect(Router.getRoute("/new")!._pathname).to.equal("/new");
  });

  it("if pathname not found, router not navigate", () => {
		Router.routes = [];
    Router.use("/", Block);
    Router.use("/new", Block);
    expect(Router.getRoute("/test")).to.undefined;
  });
});
