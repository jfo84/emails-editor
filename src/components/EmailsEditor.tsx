import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { validateEmail } from '../utils';
import { ReduxState, Dispatch } from '../redux/reducers/types';
import * as constants from '../redux/constants';

import './EmailsEditor.css';

type Props = {
  list: string[];
  addEmail: (email: string) => void;
  removeEmail: (index: number) => void;
};

type State = { ephemeralEmail: string };

class EmailsEditor extends Component<Props, State> {
  state = {
    ephemeralEmail: '',
  };

  handleChange = (event: Event): void => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ ephemeralEmail: event.target.value });
    }
  };

  handleKeyUp = (event: KeyboardEvent): void => {
    if (event.target instanceof HTMLInputElement) {
      const { code, target: { value } } = event;

      if (code === 'Comma' || code === 'Enter') {
        // The change event has likely not fired yet, so we use the target value and
        // remove the 'Comma' from the value
        const strippedEmail = (code === 'Comma')
          ? value.substring(0, value.length - 1)
          : value;
        this.props.addEmail(strippedEmail);
  
        this.setState({ ephemeralEmail: '' });
      }
    }
  };

  handlePaste = (event: ClipboardEvent): void => {
    event.preventDefault();

    if (event.target instanceof HTMLInputElement) {
      const emailListString = event.clipboardData!.getData('text/plain');
      const pastedEmails = emailListString.split(',').map(e => e.trim());
  
      pastedEmails.forEach(e => this.props.addEmail(e));
    }
  };

  handleBlur = (event: FocusEvent): void => {
    if (event.target instanceof HTMLInputElement) {
      this.props.addEmail(event.target.value);

      this.setState({ ephemeralEmail: '' });
    }
  };

  render() {
    const { list = [], removeEmail } = this.props;
    const { ephemeralEmail } = this.state;
  
    return (
      <div class='emails-editor-container'>
        {list.map((email, index) => {
          const textClass = validateEmail(email)
            ? 'email-text'
            : 'email-text invalid';

          return (
            <div class='email-container'>
              <div class={textClass}>{email}</div>
              <div
                class='email-remove'
                onClick={() => removeEmail(index)}
              ></div>
            </div>
          );
        })}
        <input
          type='email'
          class='email-input'
          spellcheck={true}
          placeholder='add more people...'
          value={ephemeralEmail}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          onPaste={this.handlePaste}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  list: state.email.list
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addEmail: (e: string) => {
    if (e) dispatch({
      type: constants.EMAIL_ADD,
      payload: { email: e },
    });
  },
  removeEmail: (i: number) => dispatch({
    type: constants.EMAIL_REMOVE,
    payload: { index: i },
  }),
});

const ConnectedEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailsEditor);

export default ConnectedEditor;
