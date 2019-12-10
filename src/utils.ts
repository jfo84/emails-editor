import { render } from 'preact';

export const deepCopy = (obj: any): any => JSON.parse(JSON.stringify(obj));
export const unmount =
  (container: Element, root: Element): Element => render(null, container, root);