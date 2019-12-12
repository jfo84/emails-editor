import { h, Component } from 'preact';

import { Store } from '../types';
import { randomWord } from '../utils';

import './EmailsButtons.css';

// type Props = {
//   emailCount: number;
//   addEmail: (email: string) => void;
// };

type Props = { store: Store; };

const EmailsButtons = ({ store }: Props) => {
  const emailCount = store.getEmailList().length;

  const handleAddClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLButtonElement) {
      const user = randomWord();
      const domain = randomWord();

      store._addEmail(`${user}@${domain}.com`);
    }
  };

  const handleCountClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLButtonElement) {
      window.alert(`The current email count is ${emailCount}`);
    }
  };

  return (
    <div class='emails-buttons-container'>
      <button
        class='add-button'
        onClick={handleAddClick}
      >
        Add email
      </button>
      <button
        class='count-button'
        onClick={handleCountClick}
      >
        Get emails count
      </button>
    </div>
  );
}

// type OuterProps = { store: Store };

// const MapToProps = ({ store }: OuterProps): Element => {
//   const count = store.getEmailList().length;
//   const { _addEmail } = store;

//   return <EmailsButtons emailCount={count} addEmail={_addEmail} />;
// };

// export default MapToProps(EmailsButtons);

export default EmailsButtons;