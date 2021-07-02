import React from 'react';
import List from '../list';
import {render} from '@testing-library/react';

describe('List', () => {
  const component = <List heading={'My List'} items={[
    {title: 'foo', url: 'https://localhost/'},
    {title: 'bar', url: 'https://localhost/'},
    {title: 'baz', url: 'https://localhost/'}
  ]} />;

  it('displays expected heading', () => {
    const { container } = render(component);

    const heading = container.querySelector('h3');

    expect(heading.textContent).toBe('My List');
  });

  it('displays expected number of list items', () => {
    const { container } = render(component);

    const items = container.querySelectorAll('ul>li');

    expect(items.length).toBe(3);
  });

  it('displays expected anchor content', () => {
    const { container } = render(component);

    const anchors = container.querySelectorAll('ul>li>a');

    expect(anchors.length).toBe(3);

    anchors.forEach((anchor) => {
      expect(['foo', 'bar', 'baz']).toContain(anchor.textContent);
    });
  });

  it('displays expected anchor targets', () => {
    const { container } = render(component);

    const anchors = container.querySelectorAll('ul>li>a');

    expect(anchors.length).toBe(3);

    anchors.forEach((anchor) => {
      expect(anchor.href).toBe('https://localhost/');
    });
  });
});

