import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Search } from '@material-ui/icons/';
import IconButton from '@material-ui/core/IconButton';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const getUser = gql`
  query {
    users{
      name
      email
    }
  }`

class Users extends React.Component {
  constructor(props){
    super(props);
    this.state = ({});
  }

  getUsers = () => {
    const { data: { users } } = this.props;
    let userList;
    if (users) {
      return userList =  users.map((user) => (
        <p key={user.email}>{user.name}</p>
      ))
    }
    return null;
  }

  render() {
    return (
      <>
        <hr/>
        <TextField
          fullWidth
          id="outlined-Search"
          placeholder="Search"
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
                <IconButton
                  aria-label="Search-User"
                >
                  <Search color="primary" />
                </IconButton>
            ),
          }}
        />
        {this.getUsers()}
      </>
    );
  }
}

export default graphql(getUser)(Users);
