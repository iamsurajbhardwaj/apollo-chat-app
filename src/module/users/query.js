import { User } from './constants';

const Query = {
  getAllUser: () => {
    return User;
  },

  getUser: (parent, { id }) => {
    return User.filter(data => data.id === id);
  }
}

export default Query;
