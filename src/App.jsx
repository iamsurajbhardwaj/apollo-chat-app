import React, { Component } from 'react';
import { HomePage, ChatPage } from './pages';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://eu1.prisma.sh/suraj-bhardwaj-c8b609/apollo-chat-app/dev' }),
  cache: new InMemoryCache()
}) ;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/homePage" />
              </Route>
              <Route exact path="/homePage" component={HomePage} />
              <Route exact path="/loggedIn" component={ChatPage} />
            </Switch>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
