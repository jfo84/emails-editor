import { h, Component } from 'preact';
import { connect } from 'preact-redux';
// @ts-ignore
import randomWords from 'random-words';

import { ReduxState, Dispatch } from '../redux/reducers/types';
import * as constants from '../redux/constants';

import './EmailsButtons.css';

type Props = {
  emailCount: number;
  addEmail: (email: string) => void;
};

const EmailsButtons = ({ emailCount, addEmail }: Props) => {
  const handleAddClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLButtonElement) {
      const user: string = randomWords();
      const domain: string = randomWords();

      addEmail(`${user}@${domain}.com`);
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

const mapStateToProps = (state: ReduxState) => ({
  emailCount: state.email.list.length
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addEmail: (e: string) => {
    if (e) dispatch({
      type: constants.EMAIL_ADD,
      payload: { email: e },
    });
  },
});

const ConnectedButtons = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailsButtons);

export default ConnectedButtons;
