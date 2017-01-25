import React from "react";
import { expect } from "chai";
import { match } from "../src";

const App = ({ children }) => (<div className="app">{children}</div>);
const Home = () => (<div><h1>Home</h1></div>)
const Foo = () => (<div><h1>Foo</h1></div>);

const routes = {
  path: "",
  component: App,
  childRoutes: [{
    path: "/",
    component: Home,
  }, {
    path: "/foo",
    component: Foo,
  }]
};

describe("match", () => {
  it("should match home route", () => {
    let next;
    const request = {
      url: "/"
    };
    match(routes)(request, {}, (err) => {
      next = true;
    });
    expect(next).to.be.ok;
    expect(request.props.matchContext).to.be.ok;
  });

  it("should match foo route", () => {
    let next;
    const request = {
      url: "/foo"
    };
    match(routes)(request, {}, (err) => {
      next = true;
    });
    expect(next).to.be.ok;
    expect(request.props.matchContext).to.be.ok;
  });

  it("should 404", () => {
    let next;
    let error;
    const request = {
      url: "/bar"
    };
    match(routes)(request, {}, (err) => {
      next = true;
      error = err;
    });
    expect(next).to.be.ok;
    expect(error).to.equal("route");
  });

  it("should return an error without routes", () => {
    let error;
    match(null)({}, {}, (err) => {
      error = err;
    });
    expect(error).to.be.ok;
  });
})
