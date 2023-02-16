import EventBus from "../EventBus/EventBus";
import { v4 as createId } from "uuid";
import { compileTemplate } from "pug";

enum EVENTS {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

type PropsObj = { [key: string]: any };

class Block {
  props: PropsObj;
  _element: HTMLElement;
  _meta;
  id: string;
  children: { [key: string]: Block };
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
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addEvents() {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          this._element.addEventListener(eventName, events[eventName]);
        }
      });
    }
  }

  private _removeEvents() {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          this._element.removeEventListener(eventName, events[eventName]);
        }
      });
    }
  }

  private _getChildren(propsAndChildren: PropsObj) {
    const children: PropsObj = {};
    const props: PropsObj = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  init() {
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });

    this._render();
  }

  componentDidMount() {
    // Может переопределять пользователь, необязательно трогать
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps?: PropsObj | unknown, newProps?: PropsObj | unknown) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this._render();
    }
  }

  componentDidUpdate(oldProps?: PropsObj | unknown, newProps?: PropsObj | unknown): boolean {
    // Может переопределять пользователь, необязательно трогать
    return true;
  }

  setProps = (nextProps: PropsObj) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this._removeEvents();
    this._element = block.firstChild as HTMLElement;
    this._addEvents();
  }

  render(template?: compileTemplate, props?: PropsObj): DocumentFragment {
		return this.compile(template, props);
  }

  compile(template?: compileTemplate, props?: PropsObj): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;

		if(template) {
			fragment.innerHTML = template(propsAndStubs);
		}

    Object.values(this.children).forEach((child: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: PropsObj) {
    props = new Proxy(props, {
      get: (target: PropsObj, property: string) => {
        if (this.isPrivateProp(property)) {
          throw new Error("Нет доступа");
        }

        return typeof target[property] === "function" ? target[property].bind(target) : target[property];
      },
      set: (target: PropsObj, property: string, value, receiver) => {
        if (this.isPrivateProp(property)) {
          throw new Error("Нет доступа");
        }

        const isUpdated = Reflect.set(target, property, value, receiver);

        this.eventBus().emit(EVENTS.FLOW_CDU, this.props, target);

        return isUpdated;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
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
      this.element.style.display = "block";
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = "none";
    }
  }

  isPrivateProp(propName: string) {
    return propName.startsWith("_");
  }
}

export default Block;
