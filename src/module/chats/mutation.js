import { Chat } from './constants';
import { pubSub, NEW_MESSAGE } from '../../subscription';

const Mutation = {
  messageSend: (parent, { email, message, sentTo, sentBy }) => {
    const newMessage = {
      email,
      message,
      sentTo,
      sentBy,
    };
    Chat.push(newMessage);
    pubSub.publish(NEW_MESSAGE, { messageSend: newMessage });
    return temp;
  },
}

export default Mutation;
