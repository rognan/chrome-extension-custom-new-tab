import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

const List = (props) => {
  const heading = props.heading;
  const items = props.items.map((item, key) =>
    <li key={key}><a href={item.url}>{item.title}</a></li>
  );

  return (
    <div>
      <h3>{heading}</h3>
      <ul>{items}</ul>
    </div>
  );
};

List.propTypes = {
  heading: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      read: [
        {title: "Reddit", url: "http://www.reddit.com"},
        {title: "HackerNews", url: "https://news.ycombinator.com"}
      ],
      learn: [
        {title: "DuoLingo", url: "https://www.duolingo.com/"},
        {title: "Khanacademy", url: "https://www.khanacademy.org/"},
        {title: "Codecademy", url: "https://www.codecademy.com/"}
      ],
      make: [
        {title: "CodePen", url: "https://codepen.io"},
        {title: "GitHub", url: "https://github.com"},
        {title: "StackOverflow", url: "https://stackoverflow.com"}
      ],
      google: [
        {title: "Mail", url: "https://mail.google.com/"},
        {title: "Calendar", url: "https://calendar.google.com/"},
        {title: "Analytics", url: "https://analytics.google.com/"}
      ]
    };
  }
  render() {
    return (
      <section className={styles.favorites}>
        <List heading="Read" items={this.state.read} />
        <List heading="Learn" items={this.state.learn} />
        <List heading="Make" items={this.state.make} />
        <List heading="Google" items={this.state.google} />
      </section>
    );
  }
}

export default Favorites;
