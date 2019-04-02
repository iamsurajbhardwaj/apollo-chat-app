import { pubSub, USER_ADDED } from '../../subscription';

const Subscription = {
  userAdded: {
    subscribe: () => pubSub.asyncIterator(USER_ADDED),
  },
};

export default Subscription;
