import { render } from 'preact';

export const deepCopy = (obj: any): any => JSON.parse(JSON.stringify(obj));
export const unmount =
  (container: Element, root: Element): Element => render(null, container, root);

const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const validateEmail = (email: string): boolean => regex.test(email.toLowerCase());