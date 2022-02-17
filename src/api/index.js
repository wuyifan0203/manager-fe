import user from './user';
import leave from './leave';
import menu from './menu';
import dep from './department';
import role from './role';

export default {
  ...user,
  ...leave,
  ...menu,
  ...dep,
  ...role
};
