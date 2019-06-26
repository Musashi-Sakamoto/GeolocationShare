import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { ListItem } from '@material-ui/core';

import CommentList from '../components/CommentList';

describe('コメントリスト', () => {
  let shallow;
  beforeEach(() => {
    shallow = createShallow();
  });

  it('データの数だけセルが正常に表示されているか確認', () => {
    const comments = [1, 2, 3, 4].map(num => ({
      comment: `comment ${num}`,
      user: {
        username: `username${num}`
      },
      createdAt: '1992-07-13'
    }));
    const wrapper = shallow(<CommentList comments={comments} />).dive();
    expect(wrapper.find(ListItem).length).toBe(comments.length);
  });
});
