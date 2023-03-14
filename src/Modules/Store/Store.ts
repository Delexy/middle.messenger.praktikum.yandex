import Block, { EVENTS } from "../../components/Block/Block";
import EventBus from "../../components/EventBus/EventBus";
import set from "../../utils/set";

type Indexed = Record<string, unknown>;

export enum StoreEvents {
  Updated = "store:updated",
}

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    try {
      this.emit(StoreEvents["Updated"], path, value);
    } catch (err) {
      // err
    }
  }
}

const store = new Store();

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
  let lastComponentState = {};

  return class extends Component {
    storeUpdateHandler;
    
    constructor(props: any) {
      const componentProps = { ...props, ...mapStateToProps(store.getState()) };
      super(componentProps);

      lastComponentState = { ...mapStateToProps(store.getState()) };

      this.storeUpdateHandler = () => {
        if (!this.componentDidUpdate(lastComponentState, { ...mapStateToProps(store.getState()) })) {
          return;
        }

        lastComponentState = { ...mapStateToProps(store.getState()) };

        this.setProps({ ...mapStateToProps(store.getState()) });
      };

      store.on(StoreEvents.Updated, this.storeUpdateHandler);

      this.eventBus().on(EVENTS.FLOW_UM, () => {
        store.off(StoreEvents.Updated, this.storeUpdateHandler);
      });
    }
  };
}

export default store;
