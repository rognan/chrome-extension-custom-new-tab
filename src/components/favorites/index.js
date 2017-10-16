import React from 'react';
import styles from './index.less';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favorites: null };
  }
  render() {
    return (
      <section className={styles.favorites}>
        <div>
          <h3>Read</h3>
          <ul>
            <li><a href="http://www.reddit.com">Reddit</a></li>
            <li><a href="https://news.ycombinator.com">HackerNews</a></li>
          </ul>
        </div>
        <div>
          <h3>Learn</h3>
          <ul>
            <li><a href="https://www.duolingo.com/">DuoLingo</a></li>
            <li><a href="https://www.khanacademy.org/">Khanacademy</a></li>
            <li><a href="https://www.codecademy.com/">Codecademy</a></li>
          </ul>
        </div>
        <div>
          <h3>Make</h3>
          <ul>
            <li><a href="https://codepen.io">CodePen</a></li>
            <li><a href="https://github.com">GitHub</a></li>
            <li><a href="https://stackoverflow.com">StackOverflow</a></li>
          </ul>
        </div>
        <div>
          <h3>Google</h3>
          <ul>
            <li><a href="https://mail.google.com">Mail</a></li>
            <li><a href="https://calendar.google.com">Calendar</a></li>
            <li><a href="https://analytics.google.com">Analytics</a></li>
          </ul>
        </div>
      </section>
    );
  }
}

export default Favorites;
