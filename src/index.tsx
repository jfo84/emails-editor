import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { createStore, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as constants from './redux/constants';
import reducers from './redux/reducers';
import initialState from './redux/reducers/initialState';
import { ReduxState } from './redux/reducers/types';

import App from './components/App';
import { deepCopy, unmount } from './utils';

declare global {
  interface Window { EmailsEditor: typeof EmailsEditor | undefined; }
}

type SubscribeToEmailList = (pl: string[], cl: string[]) => any;

type Props = {
  container: Element;
  initialList: string[];
};

const EmailsEditor = ({ container, initialList }: Props) => {
  const middlewares: Middleware[] = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const state: ReduxState = initialList ? { email: { list: initialList } } : initialState;
  const store = createStore(reducers, state, applyMiddleware(...middlewares));

  const root = render(
    <Provider store={store}>
      <App/>
    </Provider>,
    container,
  );

  let currentList: string[];

  return {
    getEmailList: () => {
      const { list } = store.getState().email;

      return deepCopy(list);
    },
    setEmailList: (emailList: string[]) => store.dispatch({
      type: constants.EMAIL_SET_LIST,
      payload: { list: emailList }
    }),
    subscribeToEmailList: (callback: SubscribeToEmailList) => store.subscribe(() => {
      let previousList = currentList;
      currentList = store.getState().email.list;

      if (previousList !== currentList) {
        callback(previousList, currentList);
      }
    }),
    close: () => {
      unmount(container, root);
    },
  };
};

window.EmailsEditor = EmailsEditor;

export default EmailsEditor;