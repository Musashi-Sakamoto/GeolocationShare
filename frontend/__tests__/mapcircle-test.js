import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Button } from '@material-ui/core';

import { Circle } from '@react-google-maps/api';

import MapCircle from '../components/map/MapCircle';

describe('マップサークル', () => {
  let shallow;
  beforeEach(() => {
    shallow = createShallow();
  });

  it('ボタンを押下時にthreadOpenが呼ばれていること', () => {
    const props = {
      location: {
        latitude: 35.689483,
        longitude: 35.689483,
        id: 1,
        user: { id: 1, username: 'username' }
      },
      currentLocation: {
        latitude: 35.689483,
        longitude: 35.689483,
        id: 1
      },
      onClickThread: jest.fn(),
      useGoogleMap: jest.fn()
    };
    const wrapper = shallow(<MapCircle {...props} />);

    wrapper.find(Button).simulate('click');
    expect(props.onClickThread).toHaveBeenCalled();
  });

  it('ユーザーネームが表示されていること', () => {
    const props = {
      location: {
        latitude: 35.689483,
        longitude: 35.689483,
        id: 1,
        user: { id: 1, username: 'username' }
      },
      currentLocation: {
        latitude: 35.689483,
        longitude: 35.689483,
        id: 1
      },
      onClickThread: jest.fn(),
      useGoogleMap: jest.fn()
    };
    const wrapper = shallow(<MapCircle {...props} />);

    wrapper.find(Button).simulate('click');
    expect(wrapper.find(Button).text()).toBe(props.location.user.username);
  });

  it('ロケーションのマーカーが自分自身の時', () => {
    const props = {
      location: {
        latitude: 35.689483,
        longitude: 35.689483,
        id: 1,
        user: { id: 1, username: 'username' }
      },
      currentLocation: {
        latitude: 35.689483,
        longitude: 35.689483,
        id: 1
      },
      onClickThread: jest.fn(),
      useGoogleMap: jest.fn()
    };
    const wrapper = shallow(<MapCircle {...props} />);
    expect(wrapper.find(Button).prop('color')).toBe('primary');
    expect(wrapper.find(Button).prop('variant')).toBe('contained');
    expect(wrapper.find(Circle).prop('options').strokeColor).toBe('#32CD32');
    expect(wrapper.find(Circle).prop('options').fillColor).toBe('#32CD32');
    expect(wrapper.find(Circle).prop('center').lat).toBe(props.currentLocation.latitude);
    expect(wrapper.find(Circle).prop('center').lng).toBe(props.currentLocation.longitude);
  });

  it('ロケーションのマーカーが他ユーザーの時', () => {
    const props = {
      location: {
        latitude: 35.689483,
        longitude: 35.689483,
        id: 2,
        user: { id: 1, username: 'username' }
      },
      currentLocation: {
        latitude: 34.689483,
        longitude: 34.689483,
        id: 1
      },
      onClickThread: jest.fn(),
      useGoogleMap: jest.fn()
    };
    const wrapper = shallow(<MapCircle {...props} />);
    expect(wrapper.find(Button).prop('color')).toBe('secondary');
    expect(wrapper.find(Button).prop('variant')).toBe('outlined');
    expect(wrapper.find(Circle).prop('options').strokeColor).toBe('#FF0000');
    expect(wrapper.find(Circle).prop('options').fillColor).toBe('#FF0000');
    expect(wrapper.find(Circle).prop('center').lat).not.toBe(props.currentLocation.latitude);
    expect(wrapper.find(Circle).prop('center').lng).not.toBe(props.currentLocation.longitude);
  });
});
