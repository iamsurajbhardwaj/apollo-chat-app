const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Chat {
    email: String!
    message: String!
    sentTo: String!
    SentBy: String!
  }
  type Query {
    getAllUser: [User]
    getUser(email: String!): [User]
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
