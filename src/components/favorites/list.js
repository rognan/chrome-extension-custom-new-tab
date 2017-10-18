import React from 'react';
import PropTypes from 'prop-types';

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

export default List;
