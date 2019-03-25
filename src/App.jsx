import React, { Component } from 'react';
import { HomePage } from './pages';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://eu1.prisma.sh/suraj-bhardwaj-c8b609/apollo-chat-app/dev' }),
  cache: new InMemoryCache()
}) ;

class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <HomePage />
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
