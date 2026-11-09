import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Birds} from './video';

registerRoot(() => <Composition id="Birds" component={Birds} durationInFrames={1440} fps={24} width={960} height={540} />);
