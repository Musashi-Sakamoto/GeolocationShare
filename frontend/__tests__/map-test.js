import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { GoogleMap } from '@react-google-maps/api';
import Map from '../components/map/Map';
import MapCircle from '../components/map/MapCircle';

describe('マップ', () => {
  let shallow;
  beforeEach(() => {
    shallow = createShallow();
  });

  it('ロケーション数だけMapCircleが表示されている', () => {
    const props = {
      locations: [1, 2, 3].map(num => ({
        latitude: 35.689483,
        longitude: 35.689483,
        id: num,
        user: { id: num, username: `username${num}` }
      })),
      currentLocation: {
        latitude: 35.689483,
        longitude: 35.689483,
        id: 1
      },
      threadJoin: jest.fn(),
      threadLeave: jest.fn()
    };

    const wrapper = shallow(<Map {...props} />).dive();
    expect(wrapper.find(MapCircle).length).toBe(props.locations.length);
  });

  it('Mapの中心がcurrentLocationの中央に配置されている', () => {
    const props = {
      locations: [1, 2, 3].map(num => ({
        latitude: 35.689483,
        longitude: 35.689483,
        id: num,
        user: { id: num, username: `username${num}` }
      })),
      currentLocation: {
        latitude: 35.689483,
        longitude: 35.689483,
        id: 1
      },
      threadJoin: jest.fn(),
      threadLeave: jest.fn()
    };

    const wrapper = shallow(<Map {...props} />).dive();
    expect(wrapper.find(GoogleMap).prop('center').lat).toBe(props.currentLocation.latitude);
    expect(wrapper.find(GoogleMap).prop('center').lng).toBe(props.currentLocation.longitude);
  });
});
