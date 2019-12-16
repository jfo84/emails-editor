export type State = {
  list: string[];
  ephemeralEmail: string;
};

export type MaybeState = State | null;

export type SubscriptionCallback = (
  previousState: string | string[],
  currentState: string | string[],
) => any;

export type PublicStore = {
  _state: State;
  _setState: (newState: State) => void;
  getEmailList: () => string[];
  setEmailList: (emailList: string[]) => string[];
  subscribeToEmailList: (cb: SubscriptionCallback) => void;
}

export type Store = PublicStore & {
  _setEphemeralEmail: (ephemeralEmail: string) => void;
  _removeEmail: (index: number) => void;
  _addEmail: (email: string) => void;
};