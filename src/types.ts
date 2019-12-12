export type State = {
  list: string[];
};

export type MaybeState = State | null;

export type SubscriptionCallback = (
  previousList: string[],
  currentList: string[],
) => any;

export type PublicStore = {
  getEmailList: () => string[];
  setEmailList: (emailList: string[]) => string[];
  subscribeToEmailList: (cb: SubscriptionCallback) => void;
}

export type Store = PublicStore & {
  _state: State;
  _setState: (newState: State) => void;
  _removeEmail: (index: number) => void;
  _addEmail: (email: string) => void;
};