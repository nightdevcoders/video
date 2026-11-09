import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {PhotoVideo} from './photo-video';

registerRoot(() => <Composition id="Birds" component={PhotoVideo} durationInFrames={1440} fps={24} width={1280} height={720} />);
