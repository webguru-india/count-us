import React from 'react';
import ReactDOM from 'react-dom';
import GuestAdvanceLogin from './GuestAdvanceLogin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GuestAdvanceLogin />, div);
  ReactDOM.unmountComponentAtNode(div);
});
