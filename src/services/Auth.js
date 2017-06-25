const Auth = {
  isAuthenticated: () => !!window.localStorage.getItem('token'),
  isAuthorized() {
    const rolesString = window.localStorage.getItem('roles');
    if (!rolesString) return false;
    const roles = rolesString.split(', ');
    return roles.includes('admin')
  },
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