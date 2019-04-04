import React, { Component } from 'react';
import { HomePage, ChatPage } from './pages';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const client = new ApolloClient({
  link: new HttpLink({ uri: `http://192.168.1.86:4000/graphql` }),
  cache: new InMemoryCache()
}) ;

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <div>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/homePage" />
                </Route>
                <Route exact path="/homePage" component={HomePage} />
                <Route path="/loggedIn/" component={ChatPage} />
              </Switch>
            </Router>
          </div>
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
