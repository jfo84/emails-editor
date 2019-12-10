import { h } from 'preact';

import EmailsEditor from './EmailsEditor';
import './App.css';

const App = () => (
  <div>
    <div class='modal'>
      <label class='bg-modal' for='modal'></label>
      <div class='inner-modal'>
        <h2 class='modal-title'>Share <b>Board name</b> with others</h2>
        <EmailsEditor />
      </div>
    </div>
  </div>
);

export default App;
