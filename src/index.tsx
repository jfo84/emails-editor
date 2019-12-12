import { h, render } from 'preact';

import { MaybeState, Store } from './types';

import App from './components/App';
import createStore from './store';

declare global {
  interface Window { EmailsEditor: typeof EmailsEditor | undefined; }
}

type Props = {
  container: Element;
  initialList: string[];
};

const EmailsEditor = ({ container, initialList }: Props): Store => {
  const state: MaybeState = initialList ? { list: initialList } : null;
  const updateTrigger = () => {};
  const store: Store = createStore(state, updateTrigger);

  render(
    <App store={store}/>,
    container,
  );

  return store;
};

window.EmailsEditor = EmailsEditor;

export default EmailsEditor;