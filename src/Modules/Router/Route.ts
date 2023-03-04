import Block from "../../components/Block/Block";
import renderDOM from "../../utils/renderDOM";

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

class Route {
  _pathname: string;
  _block: Block;
  _props: Record<string, any>;
  _isRendered: boolean;

  constructor(pathname: string, view: Block, props: Record<string, any>) {
    this._pathname = pathname;
    this._block = view;
    this._props = props;
    this._isRendered = false;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._isRendered = false;
      this._block.unmount();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._isRendered) {
      renderDOM(this._props.rootQuery, this._block);
      this._isRendered = true;
      return;
    }

    this._block.show();
  }
}

export default Route;
