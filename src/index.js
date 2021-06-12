import React from 'react';
import { render } from 'react-dom';
import Clock from 'react-live-clock';
import ErrorBoundary from './components/error-boundary';
import Favorites from './components/favorites';
import './styles/index.css';

const App = () => {
  return (
    <section>
        <Clock format={'HH:mm'} ticking={true} timezone={'Europe/Oslo'} interval={3000} />
        <hr />
        <Favorites />
    </section>
  );
};

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('container')
);
