const User = require('./constants/userConstant');
const Chat = require('./constants/chatConstant');
const pubSub = require('./server')
const USER_ADDED = 'USER_ADDED';
const NEW_MESSAGE = 'NEW_MESSAGE'

const resolvers = {
  Query: {
    getAllUser: () => {
      return User;
    },

    getUser: (parent, { email }) => {
      return User.filter(data => data.email === email);
    },

    getChat: (parent, { email, sentTo }) => {
      return User.filter(data => ( (data.email === email && data.sentTo === sentTo) || (data.email === sentTo && data.sentTo === email)));
    }
  },

  Mutation: {
    addUser: (parent, { name, email, password }) => {
      const newUser = {
        id: User.length + 1,
        name,
        email,
        password,
      };
      User.push(newUser);
      pubSub.publish(USER_ADDED, { newUser: newUser });
      return temp;
    },

    sendMessage: (parent, { email, message, sentTo, sentBy }) => {
      const newChat = {
        email,
        message,
        sentTo,
        sentBy,
      };
      Chat.push(newChat);
      pubSub.publish(NEW_MESSAGE, { newMessage: newChat });
      return temp;
    }
  },

  Subscription: {
    newUser: {
      subscribe: () => pubSub.asyncIterator(USER_ADDED),
    },

    newMessage: {
      subscribe: () => pubSub.asyncIterator(MESSAGE_SEND),
    },
  }
}

module.exports = resolvers;
