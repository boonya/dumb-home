import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Chance from 'chance';
import DEVICES from '../../../devices';
import DeviceList from '.';
import ListItem from './Item';

const chance = new Chance();

const generateItem = () => ({
  _id: chance.guid(),
  label: chance.city(),
  type: chance.pickone(Object.keys(DEVICES)),
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
    const { _id, label, type } = generateItem();

    return (
      <ListItem
        id={_id}
        label={label}
        type={type}
        onSelect={action('onSelect')}
        onDelete={action('onDelete')}
      />
    );
  });
