import React from 'react';
import List from '../list';
import { shallow } from 'enzyme';

describe('List', () => {

    it('should display heading', () => {
        const component = shallow(<List heading={'Foo'} items={['Bar']} /> );

        expect(component).toMatchSnapshot();
    });
});

