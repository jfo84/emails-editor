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

type State = { ephemeralCount: number };

class EmailsButtons extends Component<Props, State> {
  state = {
    ephemeralCount: 0,
  };

  handleAddClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLButtonElement) {
      const user: string = randomWords();
      const domain: string = randomWords();

      this.props.addEmail(`${user}@${domain}.com`);
    }
  };

  handleCountClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLButtonElement) {
      this.setState({ ephemeralCount: this.props.emailCount });
    }
  };

  render() {
    const { ephemeralCount } = this.state;

    return (
      <div class='emails-buttons-container'>
        <button
          class='add-button'
          onClick={this.handleAddClick}
        >
          Add email
        </button>
        <button
          class='count-button'
          onClick={this.handleCountClick}
        >
          Get emails count
        </button>
        <div class='emails-buttons-count'>
          {ephemeralCount ? `Count: ${ephemeralCount}` : null}
        </div>
      </div>
    );
  }
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
