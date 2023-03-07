import Block from "../../components/Block/Block";
import renderDOM from "../../utils/renderDOM";

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

class Route {
  _pathname: string;
  _block: Block | null;
  _blockClass: typeof Block;
  _props: Record<string, any>;

  constructor(pathname: string, blockClass: typeof Block, props: Record<string, any>) {
    this._pathname = pathname;
    this._block = null;
    this._blockClass = blockClass;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.unmount();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }

    renderDOM("#app", this._block);
  }
}

export default Route;
