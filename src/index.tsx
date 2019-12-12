import { h, render } from 'preact';

import { MaybeState, Store, PublicStore } from './types';

import App from './components/App';
import createStore from './store';

declare global {
  interface Window { EmailsEditor: typeof EmailsEditor | undefined; }
}

type Props = {
  container: Element;
  initialList: string[];
};

const EmailsEditor = ({ container, initialList }: Props): PublicStore => {
  const state: MaybeState = initialList ? { list: initialList } : null;
  const store: Store = createStore(state);
  // The store's subscriptions work by chaining proxies on the store's state.
  // We aren't using a library like React, so we can't rely on magic re-rendering.
  // Instead, we subscribe initially and then use that handler to trigger re-rendering.
  // This works because the only stateful 'prop' we are passing around is the list from the store.
  const renderApp = () => render(<App store={store}/>, container);

  store.subscribeToEmailList(() => renderApp());
  renderApp();

  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
    window.renderApp = renderApp;
  }

  const {
    _removeEmail,
    _addEmail,
    ...publicStore
  } = store;

  return publicStore;
};

window.EmailsEditor = EmailsEditor;

export default EmailsEditor;