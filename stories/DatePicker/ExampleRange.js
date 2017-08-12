import React from 'react';
import PropTypes from 'prop-types';
import {DatePicker} from 'wix-style-react';
import {Button} from 'wix-style-react';
import moment from 'moment';
import styles from './ExampleRange.scss';

class CustomRangeButtons extends React.Component {
  render() {
    return (
      <div style={{width: '200px'}} className={styles.buttons} tabIndex="0" onKeyDown={this.props.onKeyDown}>
        {`${this.props.startDate.format('DD/MM/YYYY')} - ${this.props.endDate.format('DD/MM/YYYY')}`}
      </div>
    )
  }
}

CustomRangeButtons.propTypes = {
  onKeyDown: PropTypes.func
}

class ControlledDatePicker extends React.Component {
  constructor(params) {
    super(params);

    this.state = {
      startDate: moment(),
      endDate: moment().add(7, "days"),
      isCalendarClickedOnce: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    const {startDate, isCalendarClickedOnce} = this.state;

    if (!isCalendarClickedOnce) {
      this.setState({
        startDate: value,
        endDate: value,
        isCalendarClickedOnce: true
      });
    } else {
      this.setState({
        startDate: value.startOf('d') <= startDate.startOf('d') ? value : startDate,
        endDate: value.startOf('d') > startDate.startOf('d') ? value : startDate,
        isCalendarClickedOnce: false
      });
    }
  }

  render() {
    const {startDate, endDate, isCalendarClickedOnce} = this.state;

    return (
      <DatePicker
        dateFormat="DD/MM/YYYY"
        onChange={this.handleChange}
        startDate={startDate}
        endDate={endDate}
        shouldCloseOnSelect={isCalendarClickedOnce}
        customInput={<CustomRangeButtons startDate={startDate} endDate={endDate}/>}
        onClickOutside={() => this.setState({isCalendarClickedOnce: false})}
        selectsStart
        selected={startDate}
      />
    );
  }
}

export default ControlledDatePicker;
