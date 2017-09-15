import React from 'react';
import {storiesOf} from '@storybook/react';

import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import AutoDocs from '../utils/Components/AutoDocs';
import TabbedView from '../utils/Components/TabbedView';
import ColorPicker from '!raw-loader!../../src/ColorPicker/color-picker';

import ExampleDefault from './ExampleDefault';

storiesOf('Core', module)
  .add('Color Picker', () => (
    <TabbedView tabs={['Example', 'API']}>
      <div>
        <InteractiveCodeExample title="Customize <ColorPicker/>" autoExpand={false}>
          <ExampleDefault/>
        </InteractiveCodeExample>
      </div>
      <AutoDocs source={ColorPicker} />
    </TabbedView>
  ));
