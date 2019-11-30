import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Chance from 'chance';

import MediaJson from './media-sources.json';

import VideoPlayer from '.';
import StreamPlayer from './StreamPlayer';
import Overlay from './Overlay';
import Info from './Info';
import RecordingLable from './RecordingLable';

const chance = new Chance();

const getMediaProps = () => {
  const selected = select(
    'Media Source',
    MediaJson.map(({ title }) => title),
  );
  const {
    sources: [src],
    description,
    thumb,
    title,
  // eslint-disable-next-line no-shadow
  } = MediaJson.find(({ title }) => title === selected) || MediaJson[0];

  return {
    src,
    description,
    thumb: src.replace(/\/[^/]+$/g, `/${thumb}`),
    title,
  };
};

storiesOf('Components|VideoPlayer', module)
  .add('VideoPlayer', () => {
    const { src, description, thumb, title } = getMediaProps();
    const error = boolean('error', false);
    const waiting = boolean('waiting', false);
    const recording = boolean('recording', false);

    return (
      <VideoPlayer
        src={src}
        description={description}
        thumb={thumb}
        title={title}
        onFullScreen={action('onFullScreen')}
        error={error}
        waiting={waiting}
        recording={recording}
      />
    );
  })
  .add('StreamPlayer', () => {
    const { src, description, thumb, title } = getMediaProps();
    const recording = boolean('recording', false);

    return (
      <StreamPlayer
        src={src}
        description={description}
        thumb={thumb}
        title={title}
        onFullScreen={action('onFullScreen')}
        recording={recording}
      />
    );
  })
  .add('Overlay', () => {
    const title = text('title', chance.sentence({ words: 3 }));
    const description = text('description', chance.paragraph({ sentences: 3 }));
    const thumb = text('thumb', 'http://boonya.info/wat.jpg');
    const recording = boolean('recording', false);
    const waiting = boolean('waiting', false);
    const error = boolean('error', false);

    return (
      <Overlay {...{ title, description, thumb, error, recording, waiting }} onFullScreen={action('onFullScreen')} />
    );
  })
  .add('Info', () => {
    const title = text('title', chance.sentence({ words: 3 }));
    const description = text('description', chance.paragraph({ sentences: 3 }));
    const recording = boolean('recording', false);
    const error = boolean('error', false);
    return <Info {...{ title, description, recording, error }} />;
  })
  .add('RecordingLable', () => <RecordingLable />);
