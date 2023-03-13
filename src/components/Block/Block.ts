import EventBus from "../EventBus/EventBus";
import { v4 as createId } from "uuid";
import { compileTemplate } from "pug";
import deepEqual from "../../utils/deepEqual";

enum EVENTS {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_CU = "flow:component-updated",
  FLOW_RENDER = "flow:render",
  FLOW_UM = "flow:component-unmount"
}

interface BlockProps {
  [key: string]: any;
}

class Block {
  props: BlockProps;
  _element: HTMLElement;
  _meta;
  _needUpdate: boolean;
  id: string;
  children: { [key: string]: Block | Block[] };
  eventBus: () => EventBus;

  constructor(propsAndChildren = {}) {
    const eventBus = new EventBus();
    const { children, props } = this._getChildren(propsAndChildren);

    this.id = createId();
    this._element;
    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props);
    this.children = children;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(EVENTS.INIT, this._init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_CU, this._componentUpdated.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(EVENTS.FLOW_UM, this._unmount.bind(this));
  }

  private _unregisterEvents() {
    this.eventBus().off(EVENTS.INIT, this._init.bind(this));
    this.eventBus().off(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus().off(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus().off(EVENTS.FLOW_CU, this._componentUpdated.bind(this));
    this.eventBus().off(EVENTS.FLOW_RENDER, this._render.bind(this));
    this.eventBus().off(EVENTS.FLOW_UM, this._unmount.bind(this));
  }

  private _addEvents() {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          if (Array.isArray(events[eventName])) {
            events[eventName].forEach((event: () => void) => this._element.addEventListener(eventName, event));
          } else {
            this._element.addEventListener(eventName, events[eventName]);
          }
        }
      });
    }
  }

  private _removeEvents() {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          if (Array.isArray(events[eventName])) {
            events[eventName].forEach((event: () => void) => this._element.removeEventListener(eventName, event));
          } else {
            this._element.removeEventListener(eventName, events[eventName]);
          }
        }
      });
    }
  }

  private _getChildren(propsAndChildren: BlockProps) {
    const children: BlockProps = {};
    const props: BlockProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if ((Array.isArray(value) && value[0] instanceof Block) || value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _init() {
    this.init();
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  init() {
    // Переопределяется пользователем
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((subChild) => subChild.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount() {
    // Может переопределять пользователь, необязательно трогать
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps?: BlockProps | unknown, newProps?: BlockProps | unknown) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(EVENTS.FLOW_RENDER);
      this.eventBus().emit(EVENTS.FLOW_CU);
    }
  }

  componentDidUpdate(oldProps?: BlockProps | unknown, newProps?: BlockProps | unknown): boolean {
    if (deepEqual(oldProps as Record<string, unknown>, newProps as Record<string, unknown>)) {
      return false;
    }
    return true;
  }

  _componentUpdated(): void {
    this.componentUpdated();
  }

  componentUpdated(): void {
    // Может переопределять пользователь, необязательно трогать
  }

  _componentBeforeUnmount(): void {
    this._removeEvents();
    this._unregisterEvents();
    this.componentBeforeUnmount();
  }

  componentBeforeUnmount(): void {
    // Может переопределять пользователь, необязательно трогать
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render() as DocumentFragment;
    this._removeEvents();

    const newElement = block.firstChild;
    if (this._element) {
      this._element.replaceWith(block);
    }

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  render() {
    // Может переопределить пользователь
    return "" as any;
  }

  compile(template: compileTemplate, props: BlockProps): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((subChild) => `<div data-id="${subChild.id}"></div>`).join("");
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child: Block) => {
      if (Array.isArray(child)) {
        child.forEach((subChild) => {
          const stub = fragment.content.querySelector(`[data-id="${subChild.id}"]`);
          if (stub) {
            stub.replaceWith(subChild.getContent());
          }
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
        if (stub) {
          stub.replaceWith(child.getContent());
        }
      }
    });

    return fragment.content;
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: BlockProps) {
    props = new Proxy(props, {
      get: (target: BlockProps, property: string) => {
        return typeof target[property] === "function" ? target[property].bind(target) : target[property];
      },
      set: (target: BlockProps, property: string, value, receiver) => {
        const oldProps = JSON.parse(JSON.stringify(target));
        const isUpdated = Reflect.set(target, property, value, receiver);

        if(!deepEqual(oldProps[property], target[property])) {
          this.eventBus().emit(EVENTS.FLOW_CDU, oldProps, target);
        }

        return isUpdated;
      },
    });

    return props;
  }

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    if (this.element) {
      this.element.style.display = "";
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = "none";
    }
  }

  _unmount() {
    this._componentBeforeUnmount();
    if(this._element) {
      this._element.outerHTML = "";
    }
  }

  unmount() {
    this.eventBus().emit(EVENTS.FLOW_UM);
  }
}

export { Block as default, BlockProps };
