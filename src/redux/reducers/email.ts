import * as constants from '../constants';

import { Action, EmailState } from './types';

export const initialState: EmailState = { list: [] };

const email = (
  state = initialState,
  { type, payload }: Action,
) => {
  switch (type) {
    case constants.EMAIL_SET_LIST:
      return {
        ...state,
        list: payload.list,
      };

    case constants.EMAIL_REMOVE: {
      const { list } = state;

      // Copy
      let newList = JSON.parse(JSON.stringify(list));
      // Remove element by index
      newList.splice(payload.index, 1);

      return {
        ...state,
        list: newList,
      };
    }
    
    case constants.EMAIL_ADD: {
      const { list } = state;

      // Add element by index
      const newList = [ ...list, payload.email ];

      return {
        ...state,
        list: newList,
      };
    }

    default:
      return state;
  }
}

export default email;