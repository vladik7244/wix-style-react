import React from 'react';
import {storiesOf} from '@storybook/react';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import AutoDocs from '../utils/Components/AutoDocs';
import ColorPicker from '!raw-loader!../../src/ColorPicker/ColorPicker';
import TabbedView from '../utils/Components/TabbedView';

import ExampleDefault from './ExampleDefault';

storiesOf('Core', module)
  .add('Color Picker', () => (
    <TabbedView tabs={['API', 'Properties']}>
      <div>
        <h1>Usage examples</h1>
        <InteractiveCodeExample title="Customize a <ColorPicker/>">
          <ExampleDefault/>
        </InteractiveCodeExample>
      </div>
      <AutoDocs source={ColorPicker} />
    </TabbedView>
  ));
