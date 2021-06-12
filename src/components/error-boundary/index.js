import React from 'react';
import PropTypes from 'prop-types';
import { init, captureException, lastEventId, showReportDialog } from '@sentry/browser';
import styles from './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
    init({
        dsn: 'https://ae0abaf060a842dd8996a744473193c3@sentry.io/227131'
    });
  }
  componentDidCatch(error, info) {
    this.setState({hasError: true});
    captureException(error, {extra: info});
  }
  render() {
    if (this.state.hasError) {
      return (
        <div onClick={() => lastEventId() && showReportDialog()}>
          <p>Whoops - Something went wrong!</p>
          <p className={styles.error__clickme}>Click here to fill out a bug report to help us fix this problem faster.</p>
        </div>
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
