import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Button } from '@material-ui/core';
import Router from 'next/router';
import Navbar from '../components/Navbar';

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe('ナビバー', () => {
  let shallow;
  beforeEach(() => {
    shallow = createShallow();
  });

  it('ログイン画面表示', () => {
    const wrapper = shallow(<Navbar isLogin />).dive();

    expect(wrapper.find(Button).text()).toBe('Signup');
  });

  it('サインアップ画面表示', () => {
    const wrapper = shallow(<Navbar isLogin={false} />).dive();

    expect(wrapper.find(Button).text()).toBe('Login');
  });

  it('ログイン後画面表示', () => {
    const wrapper = shallow(<Navbar isLoggedIn />).dive();

    expect(wrapper.find(Button).text()).toBe('Logout');
  });

  it('ログイン後画面表示', () => {
    const onLogoutClicked = jest.fn();
    const wrapper = shallow(<Navbar isLoggedIn onLogoutClick={onLogoutClicked} />).dive();

    expect(wrapper.find(Button).text()).toBe('Logout');
    wrapper.find(Button).simulate('click');
    expect(onLogoutClicked).toHaveBeenCalled();
  });
});
