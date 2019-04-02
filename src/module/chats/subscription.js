import { pubSub, MESSAGE_SEND } from '../../subscription';

const Subscription = {
  messageSend: {
    subscribe: () => pubSub.asyncIterator(MESSAGE_SEND),
  },
};

export default Subscription;
