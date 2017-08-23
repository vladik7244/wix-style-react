import {func} from 'prop-types';
import InputWithOptions from '../InputWithOptions';

import {SBComponent as sbcomponent} from 'stylable-react-component';
import styles from './AutoComplete.st.css';

class AutoComplete extends InputWithOptions {
  static propTypes = {
    ...InputWithOptions.propTypes,
    predicate: func
  }

  static defaultProps = {
    ...InputWithOptions.defaultProps,
    predicate: () => true
  }

  dropdownAdditionalProps() {
    const {options, predicate} = this.props;
    const filterFunc = this.state.isEditing ? predicate : () => true;
    return {options: options.filter(filterFunc)};
  }
}

export default sbcomponent(AutoComplete, styles);
