export type Action = {
  type: string;
  payload: any;
};

export type Dispatch = (action: Action) => any;

export type Unsubscribe = () => void;

export type EmailState = {
  list: string[];
};

export type ReduxState = {
  email: EmailState;
};