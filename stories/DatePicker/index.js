import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import AutoDocs from '../utils/Components/AutoDocs';
import DatePickerSource from '!raw-loader!wix-style-react/DatePicker/DatePicker';
import TabbedView from '../utils/Components/TabbedView';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/DatePicker/README.md';
import ReadmeTestkit from '../../src/DatePicker/README.TESTKIT.md';
import moment from 'moment';

import DatePicker from 'wix-style-react/DatePicker';
import AutoExample from '../utils/Components/AutoExample';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';
import ExampleControlledRtl from './ExampleControlledRtl';
import ExampleControlledRtlRaw from '!raw-loader!./ExampleControlledRtl';
import ExampleControlledExcludePast from './ExampleControlledExcludePast';
import ExampleControlledExcludePastRaw from '!raw-loader!./ExampleControlledExcludePast';
import ExampleDisabled from './ExampleDisabled';
import ExampleDisabledRaw from '!raw-loader!./ExampleDisabled';
import ExampleControlledCloseOnSelect from './ExampleControlledShouldCloseOnSelect';
import ExampleControlledCloseOnSelectRaw from '!raw-loader!./ExampleControlledShouldCloseOnSelect';
import ExampleControlledYearMonthDropdowns from './ExampleControlledYearMonthDropdownEnabled';
import ExampleControlledYearMonthDropdownsRaw from '!raw-loader!./ExampleControlledYearMonthDropdownEnabled';

storiesOf('Core', module)
  .add('DatePicker', () => (
    <TabbedView tabs={['Usage', 'API', 'TestKit']}>
      <div>
        <Markdown source={Readme}/>

        <AutoExample
          component={DatePicker}
          source={DatePickerSource}
          defaultProps={{
            onChange: value => console.log('DatePicker value is now ', value.toString()),
            dateFormat: 'YYYY/MM/DD',
            dataHook: 'storybook-datepicker',
            value: moment('2017/01/01')
          }}
          />

        <CodeExample title="Controlled input" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>

        <CodeExample title="Controlled input - RTL" code={ExampleControlledRtlRaw}>
          <ExampleControlledRtl/>
        </CodeExample>

        <CodeExample title="Controlled input - exclude past dates" code={ExampleControlledExcludePastRaw}>
          <ExampleControlledExcludePast/>
        </CodeExample>

        <CodeExample title="Disabled input" code={ExampleDisabledRaw}>
          <ExampleDisabled/>
        </CodeExample>

        <CodeExample title="Controlled input - should not close on select" code={ExampleControlledCloseOnSelectRaw}>
          <ExampleControlledCloseOnSelect/>
        </CodeExample>

        <CodeExample
          title="Controlled input - show month and year dropdowns"
          code={ExampleControlledYearMonthDropdownsRaw}
          >
          <ExampleControlledYearMonthDropdowns/>
        </CodeExample>
      </div>

      <AutoDocs source={DatePickerSource}/>

      <Markdown source={ReadmeTestkit}/>
    </TabbedView>
  ));
