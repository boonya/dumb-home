import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';

import App, { store } from '../imports/ui/App';
import actions from '../imports/ui/redux/actions';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.getElementById('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return <App />;
}

Meteor.startup(() => {
  store.dispatch(actions.me.subscribe());
  ReactDOM.render(<Main />, document.getElementById('viewport-root'));
});
