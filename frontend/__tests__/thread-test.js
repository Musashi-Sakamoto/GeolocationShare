import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import { TextField, Button } from '@material-ui/core';

import Thread from '../components/Thread';

describe('スレッド', () => {
  let shallow;
  beforeEach(() => {
    shallow = createShallow();
  });

  it('テキストフィールドに何か埋めた状態でSubmitをクリックするとpostCommentが呼び出される', () => {
    const props = {
      isOpen: true,
      onClose: jest.fn(),
      comments: [],
      location: { user: { username: 'username' } },
      postComment: jest.fn()
    };
    const wrapper = shallow(<Thread {...props} />).dive();

    wrapper.find(TextField).simulate('change', {
      target: {
        value: 'title'
      }
    });
    wrapper.find(Button).simulate('click');
    expect(props.postComment).toHaveBeenCalled();
  });

  it('テキストフィールドに何も状態でSubmitをクリックしてもpostCommentが呼び出されない', () => {
    const props = {
      isOpen: true,
      onClose: jest.fn(),
      comments: [],
      location: { user: { username: 'username' } },
      postComment: jest.fn(),
      enqueueSnackbar: jest.fn()
    };
    const wrapper = shallow(<Thread {...props} />).dive();

    wrapper.find(TextField).simulate('change', {
      target: {
        value: ''
      }
    });
    wrapper.find(Button).simulate('click');
    expect(props.postComment).not.toHaveBeenCalled();
    expect(props.enqueueSnackbar).toHaveBeenCalled();
  });
});
