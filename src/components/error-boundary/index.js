import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }
  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(ignored) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
          <p>Whoops - Something went wrong!</p>
      );
    }
    else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
};

export default ErrorBoundary;
