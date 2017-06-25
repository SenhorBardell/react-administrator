const Auth = {
  isAuthenticated: () => !!window.localStorage.getItem('token'),
  // TODO
  authenticate() {
    if (window.localStorage.getItem('token')) return Promise.resolve(true);

    return Promise.resolve(false)
  },
  clear() {
    window.localStorage.removeItem('token');

    return Promise.resolve()
  }
};

export default Auth