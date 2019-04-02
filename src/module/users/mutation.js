import { User, id } from './constants';
import { pubSub, USER_ADDED } from '../../subscription';

const Mutation = {
  addUser: (parent, { name, email, password }) => {
    const newUser = {
      id: id + 1,
      name,
      email,
      password,
    };
    User.push(newUser);
    pubSub.publish(USER_ADDED, { userAdded: newUser });
    return temp;
  },
}

export default Mutation;
