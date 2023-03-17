import { expect } from "chai";
import { Router } from "./Router";

describe("Router ", () => {
  it("after 'use' method 'routes' length === 1", () => {
		// Router.use('/', Block);
		expect(Router.routes.length).to.equal(0);
  });
}); 
