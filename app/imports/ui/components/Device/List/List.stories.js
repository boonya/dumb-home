import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Chance from 'chance';
import DEVICES from '../../../../devices';
import DeviceList from '.';
import ListItem from './Item';

const chance = new Chance();

const generateItem = () => ({
  _id: chance.guid(),
  label: chance.city(),
  type: chance.pickone(Object.values(DEVICES)),
  recording: chance.pickone([true, false]),
});

const generateList = (n) => chance.unique(generateItem, n);

storiesOf('Components|Device/List', module)
  .add('index', () => {
    const loading = boolean('loading', false);
    const num = number('number', 5, { min: 0, max: 20 });
    const list = generateList(num);

    return (
      <DeviceList
        list={list}
        loading={loading}
        onSelect={action('onSelect')}
        onDelete={action('onDelete')}
      />
    );
  }).add('Item', () => {
    const label = text('label', 'Label');
    const recording = boolean('recording', true);

    return (
      <ListItem
        id={chance.guid()}
        label={label}
        type={DEVICES.CAMERA}
        recording={recording}
        onSelect={action('onSelect')}
        onDelete={action('onDelete')}
      />
    );
  });
