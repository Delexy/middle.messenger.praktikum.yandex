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
    } catch(err) {
      // err
    }
  }

  public delete(key: string) {
    delete this.state[key];
  }
}

export default new Store();
