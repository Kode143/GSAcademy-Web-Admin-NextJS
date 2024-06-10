import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Calendar from './CalenderComponents/Calendar';

class Main extends React.Component {
  render() {
    return (
      <Calendar className="myReactCalendar"/>
    );
  }
}

const rootElement = document.getElementById('gallery-root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Main />);
}
