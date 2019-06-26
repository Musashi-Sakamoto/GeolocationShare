import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { TextField, Button } from '@material-ui/core';

import Form from '../components/Form';

describe('ログイン・サインアップフォーム', () => {
  let shallow;
  beforeEach(() => {
    shallow = createShallow();
  });

  it('ログイン画面表示', () => {
    const wrapper = shallow(<Form isLogin />).dive();

    expect(wrapper.find(TextField).length).toBe(2);
    expect(wrapper.find(Button).text()).toBe('Login');
  });

  it('サインアップ画面表示', () => {
    const wrapper = shallow(<Form isLogin={false} />).dive();

    expect(wrapper.find(TextField).length).toBe(3);
    expect(wrapper.find(Button).text()).toBe('Signup');
  });

  it('ログインにおいてテキストを入力するとボタンをクリックした時にコールバック呼び出しされる', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<Form isLogin onSubmit={onSubmit} />).dive();
    wrapper.find(TextField).first().simulate('change', {
      target: {
        value: 'username'
      }
    });
    wrapper.find(TextField).at(1).simulate('change', {
      target: {
        value: 'password'
      }
    });
    wrapper.find(Button).simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('ログインにおいてテキストを入力しないと関数が呼び出されない', () => {
    const onSubmit = jest.fn();
    const enqueueSnackbar = jest.fn();
    const wrapper = shallow(<Form isLogin onSubmit={onSubmit} enqueueSnackbar={enqueueSnackbar} />).dive();
    wrapper.find(TextField).first().simulate('change', {
      target: {
        value: ''
      }
    });
    wrapper.find(TextField).at(1).simulate('change', {
      target: {
        value: 'password'
      }
    });
    wrapper.find(Button).simulate('click');
    expect(onSubmit).not.toHaveBeenCalled();
    expect(enqueueSnackbar).toHaveBeenCalled();
  });

  it('サインアップにおいてテキストを入力するとボタンをクリックした時にコールバック呼び出しされる', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<Form isLogin={false} onSubmit={onSubmit} />).dive();
    wrapper.find(TextField).first().simulate('change', {
      target: {
        value: 'email@email.com'
      }
    });
    wrapper.find(TextField).at(1).simulate('change', {
      target: {
        value: 'username'
      }
    });
    wrapper.find(TextField).at(2).simulate('change', {
      target: {
        value: 'password'
      }
    });
    wrapper.find(Button).simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('サインアップにおいてテキストを入力しないと関数が呼び出されない', () => {
    const onSubmit = jest.fn();
    const enqueueSnackbar = jest.fn();
    const wrapper = shallow(<Form isLogin={false} onSubmit={onSubmit} enqueueSnackbar={enqueueSnackbar} />).dive();
    wrapper.find(TextField).first().simulate('change', {
      target: {
        value: ''
      }
    });
    wrapper.find(TextField).at(1).simulate('change', {
      target: {
        value: ''
      }
    });
    wrapper.find(TextField).at(2).simulate('change', {
      target: {
        value: 'password'
      }
    });
    wrapper.find(Button).simulate('click');
    expect(onSubmit).not.toHaveBeenCalled();
    expect(enqueueSnackbar).toHaveBeenCalled();
  });
});
