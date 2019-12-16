import { MaybeState, Store, PublicStore } from './types';

import App from './components/App';
import createStore from './store';
import { dom } from './utils';

declare global {
  interface Window { EmailsEditor: typeof EmailsEditor | undefined; }
}

type Props = {
  container: Element;
  initialList: string[];
};

const EmailsEditor = ({ container, initialList }: Props): PublicStore => {
  const state: MaybeState = initialList ? { list: initialList, ephemeralEmail: '' } : null;
  const store: Store = createStore(state);
  // The store's subscriptions work by chaining proxies on the store's state.
  // We aren't using a library like React, so we can't rely on magic re-rendering.
  // Instead, we subscribe internally and then use that handler to trigger re-rendering.
  // This works because the only stateful 'props' we are passing around are the list and email from the store.
  const rootElement = () => <App store={store}/>;

  let root = rootElement();
  let previousRoot;
  container.appendChild(root);
  store.subscribeToEmailList(() => {
    previousRoot = root;
    root = rootElement();
    container.replaceChild(root, previousRoot);
  });

  const {
    _removeEmail,
    _addEmail,
    ...publicStore
  } = store;

  return publicStore;
};

window.EmailsEditor = EmailsEditor;

export default EmailsEditor;