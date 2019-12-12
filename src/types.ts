export type State = {
  list: string[];
};

export type MaybeState = State | null;

export type SubscriptionCallback = (
  previousList: string[],
  currentList: string[],
) => any;

export type Store = {
  _state: State;
  _setState: (newState: State) => void;
  _removeEmail: (index: number) => void;
  _addEmail: (email: string) => void;
  getEmailList: () => string[];
  setEmailList: (emailList: string[]) => string[];
  subscribeToEmailList: (cb: SubscriptionCallback) => void;
};