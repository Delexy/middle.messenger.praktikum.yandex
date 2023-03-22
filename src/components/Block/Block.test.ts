import { expect } from "chai";
import Block from "./Block";

class DummyBlock extends Block {
  componentDidMount(): void {
    const element = document.createElement("p");
    element.textContent = "New content";
    this._element = element;
  }

  render() {
    const element = document.createElement("p");
    element.textContent = "Hello world";
    const fragment = document.createDocumentFragment();
    fragment.append(element);
    return fragment;
  }
}

describe("Block", () => {
  it("Render right content", () => {
    const block = new DummyBlock();
    expect(block.element.outerHTML).to.eq("<p>Hello world</p>");
  });

  it("componentDidMount called", () => {
    const block = new DummyBlock();
    block.dispatchComponentDidMount();

    expect(block.element.outerHTML).to.eq("<p>New content</p>");
  });

  it("props updated by setProp", () => {
    const block = new DummyBlock();
    block.setProps({ prop: "test" });

    expect(block.props.prop).to.eq("test");
  });
});
