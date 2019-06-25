import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import { Button } from '@material-ui/core';
import Router from 'next/router';
import Navbar from '../components/Navbar';

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe('ナビバー', () => {
  let shallow;
  let mount;
  beforeEach(() => {
    shallow = createShallow();
    mount = createMount();
  });

  it('ログイン画面表示', () => {
    const wrapper = mount(<Navbar isLogin />);

    expect(wrapper.find(Button).text()).toBe('Signup');
  });

  it('サインアップ画面表示', () => {
    const wrapper = mount(<Navbar isLogin={false} />);

    expect(wrapper.find(Button).text()).toBe('Login');
  });

  it('ログイン後画面表示', () => {
    const wrapper = mount(<Navbar isLoggedIn />);

    expect(wrapper.find(Button).text()).toBe('Logout');
  });

  it('ログイン後画面表示', () => {
    const onLogoutClicked = jest.fn();
    const wrapper = mount(<Navbar isLoggedIn onLogoutClick={onLogoutClicked} />);

    expect(wrapper.find(Button).text()).toBe('Logout');
    wrapper.find(Button).simulate('click');
    expect(onLogoutClicked).toHaveBeenCalled();
  });
});
