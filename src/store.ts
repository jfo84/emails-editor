import { MaybeState, State, Store, SubscriptionCallback } from './types';
import { deepCopy } from './utils';

const initialState = { list: [], ephemeralEmail: '' };

const createHandler = (callback: SubscriptionCallback): ProxyHandler<State> => ({
  set: (target, property, value) => {
    if (property === 'list') {
      const previous: string[] = deepCopy(target[property]);
      const current: string[] = value;

      target[property] = value;

      if (previous !== current) {
        callback(previous, current);
      }
    }

    return true;
  },
});

const createStore = (
  state: MaybeState = initialState,
): Store => ({
  _state: <State>state,
  _setState: function(newState: State): void {
    this._state = newState;
  },
  _setEphemeralEmail: function(ephemeralEmail: string): void {
    this._state.ephemeralEmail = ephemeralEmail;
  },
  _addEmail: function(email: string): void {
    const { list } = this._state;

    // Add element by index
    const newList = [ ...list, email ];
  
    this.setEmailList(newList);
    return;
  },
  _removeEmail: function(index: number): void {
    const { list } = this._state;

    let newList = deepCopy(list);
    // Remove element by index
    newList.splice(index, 1);
  
    this.setEmailList(newList);
    return;
  },
  getEmailList: function(): string[] {
    const { list } = this._state;

    return deepCopy(list);
  },
  setEmailList: function(emailList: string[]): string[] {
    this._state.list = emailList;

    return deepCopy(emailList);
  },
  subscribeToEmailList: function(callback: SubscriptionCallback): void {
    const handler = createHandler(callback);
    const state = new Proxy(this._state, handler);

    this._setState(state);
    return;
  },
});

export default createStore;