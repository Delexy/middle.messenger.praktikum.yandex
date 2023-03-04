import Block from "../../components/Block/Block";
import renderDOM from "../../utils/renderDOM";

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

class Route {
  _pathname: string;
  _block: Block;
  _props: Record<string, any>;
  _isInit: boolean;

  constructor(pathname: string, view: Block, props: Record<string, any>) {
      this._pathname = pathname;
      this._block = view;
      this._props = props;
      this._isInit = false;
  }

  navigate(pathname: string) {
      if (this.match(pathname)) {
          this._pathname = pathname;
          this.render();
      }
  }

  leave() {
      if (this._block) {
          this._block.hide();
      }
  }

  match(pathname: string) {
      return isEqual(pathname, this._pathname);
  }

  render() {
      if (!this._isInit) {
          renderDOM(this._props.rootQuery, this._block);
          this._isInit = true;
          return;
      }

      this._block.show();
  }
}

export default Route;
