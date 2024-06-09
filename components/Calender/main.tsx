import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Calendar from './CalenderComponents/Calendar';


class Main extends React.Component {
  render() {
    return (
      <Calendar className="myReactCalendar"/>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('gallery-root')
);