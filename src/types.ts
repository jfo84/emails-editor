export type State = {
  list: string[];
  ephemeralEmail: string;
};

export type MaybeState = State | null;

export type SubscriptionCallback = (
  previousState: string | string[],
  currentState: string | string[],
) => any;

export type Store = {
  _state: State;
  _setState: (newState: State) => void;
  _setEphemeralEmail: (ephemeralEmail: string) => void;
  _removeEmail: (index: number) => void;
  _addEmail: (email: string) => void;
  getEmailList: () => string[];
  setEmailList: (emailList: string[]) => string[];
  subscribeToEmailList: (cb: SubscriptionCallback) => void;
};