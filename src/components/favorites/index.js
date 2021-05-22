import React from 'react';
import List from './list';
import styles from './index.less';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [
        {heading: "Learn", links: [
          {title: "DuoLingo", url: "https://www.duolingo.com/"},
          {title: "Khanacademy", url: "https://www.khanacademy.org/"},
          {title: "Codecademy", url: "https://www.codecademy.com/"}
        ]},
        {heading: "Make", links: [
          {title: "CodePen", url: "https://codepen.io"},
          {title: "GitHub", url: "https://github.com"},
          {title: "StackOverflow", url: "https://stackoverflow.com"}
        ]},
        {heading: "Read", links: [
          {title: "Reddit", url: "https://www.reddit.com"},
          {title: "HackerNews", url: "https://news.ycombinator.com"}
        ]}
      ]
    };
  }
  render() {
    return (
      <section className={styles.favorites}>
        {this.state.lists.map((list, key) =>
          <List key={key} heading={list.heading} items={list.links} />
        )}
      </section>
    );
  }
}

export default Favorites;
