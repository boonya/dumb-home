import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { radios } from '@storybook/addon-knobs';

import LoginForm, { FORM_STATES } from '.';

storiesOf('Components|Forms', module).add('LoginForm', () => {
  const state = radios('state', ['Default', ...Object.values(FORM_STATES)], 'Default');
  return <LoginForm state={state !== 'Default' ? state : null} handleSubmit={action('handleSubmit')} />;
});
