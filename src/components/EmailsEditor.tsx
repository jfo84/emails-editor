import { h, Component } from 'preact';

import { validateEmail } from '../utils';
import { Store } from '../types';

import './EmailsEditor.css';

// type Props = {
//   list: string[];
//   addEmail: (email: string) => void;
//   removeEmail: (index: number) => void;
// };

type Props = { store: Store; };

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
        this.props.store._addEmail(strippedEmail);
  
        this.setState({ ephemeralEmail: '' });
      }
    }
  };

  handlePaste = (event: ClipboardEvent): void => {
    event.preventDefault();

    if (event.target instanceof HTMLInputElement) {
      const emailListString = event.clipboardData!.getData('text/plain');
      const pastedEmails = emailListString.split(',').map(e => e.trim());
  
      pastedEmails.forEach(e => this.props.store._addEmail(e));
    }
  };

  handleBlur = (event: FocusEvent): void => {
    if (event.target instanceof HTMLInputElement) {
      this.props.store._addEmail(event.target.value);

      this.setState({ ephemeralEmail: '' });
    }
  };

  render() {
    const { store } = this.props;
    const list = store.getEmailList();

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
                onClick={() => store._removeEmail(index)}
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

// type OuterProps = { store: Store };

// const MapToProps = ({ store }: OuterProps): Element => {
//   const list = store.getEmailList();
//   const { _addEmail, _removeEmail } = store;

//   return <EmailsEditor list={list} addEmail={_addEmail} removeEmail={_removeEmail} />;
// };

// export default MapToProps(EmailsEditor);

export default EmailsEditor;
