const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Chat {
    email: String!
    sentBy: String!
    sentTo: String!
    message: String!
  }
  type Query {
    getAllUser: [User]
    getUser(email: String!): [User]
    getAllChat: [Chat]
    getChat(email: String!, sentTo: String!): [Chat]
  }

  type Mutation {
    sendMessage(email: String!, sentBy: String!, sentTo: String!, message: String!): Chat!
    addUser(name: String!, email: String!, password: String!): User!
  }

  type Subscription {
    newMessage: Chat!
    newUser: User!
  }`


  module.exports = typeDefs;
