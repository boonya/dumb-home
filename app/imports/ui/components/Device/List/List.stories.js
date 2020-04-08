import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Chance from 'chance';

import DEVICES from '../../../devices';
import DeviceList from '.';

const chance = new Chance();
const ITEMS = chance.n(
  () => ({
    id: chance.guid(),
    label: chance.city(),
    type: chance.pickone(Object.keys(DEVICES)),
  }),
  8,
);

storiesOf('Components|Device', module).add('List', () => {
  const loading = boolean('loading', false);

  return <DeviceList list={ITEMS} loading={loading} onSelect={action('onSelect')} onDelete={action('onDelete')} />;
});
