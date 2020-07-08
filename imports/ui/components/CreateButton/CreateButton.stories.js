import React from 'react';
import { storiesOf } from '@storybook/react';

import CreateButton from '.';

storiesOf('Components|Buttons', module).add('CreateButton', () => (
  <CreateButton id="any-element-id">There should be a popover menu</CreateButton>
));
