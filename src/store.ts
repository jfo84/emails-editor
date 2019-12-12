import { MaybeState, State, Store, SubscriptionCallback } from './types';
import { deepCopy } from './utils';

const initialState = { list: [] };

const createStore = (
  maybeState: MaybeState = initialState,
  updateTrigger: () => void,
): Store => {
  // The store's subscriptions work by chaining proxies. This works because
  // the shape of the state is the same across instances of `EmailEditor`.
  //
  // We aren't using a library like React, so we can rely on magic re-rendering.
  // Instead, we wrap the state in a proxy initially and then use that subscription to trigger re-rendering.
  // This works because the only stateful 'prop' we are passing around is the list from the store.
  const handler: ProxyHandler<State> = {
    set: (target, property, value) => {
      if (property === 'list') {
        const previousList: string[] = target[property];
        const currentList: string[] = value;
  
        if (previousList !== currentList) {
          updateTrigger();
        }
  
        target[property] = value;
      }

      return true;
    },
  };
  const state = new Proxy(<State>maybeState, handler);

  return {
    _state: state,
    _setState: function(newState: State): void {
      this._state = newState;
    },
    _addEmail: function(email: string) {
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
      const handler: ProxyHandler<State> = {
        set: (target, property, value) => {
          if (property === 'list') {
            const previousList: string[] = target[property];
            const currentList: string[] = value;
      
            if (previousList !== currentList) {
              callback(previousList, currentList);
            }
      
            target[property] = value;
          }
    
          return true;
        },
      };
      const state = new Proxy(this._state, handler);
  
      this._setState(state);
      return;
    },
  };
};

export default createStore;