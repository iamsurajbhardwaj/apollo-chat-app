import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';
import { Email, Person, Visibility, VisibilityOff } from '@material-ui/icons/';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ADD_USER = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      name
      email
      password
    }
  }
`;

class CreateUser extends React.Component {
  state = {
    open: false,
    name: '',
    email: '',
    password: '',
    passwordVisibility: {
      showPassword: false,
      showConfirmPassword: false,
    },
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleClickShowPassword = field => () => {
    const { passwordVisibility } = this.state;
    this.setState({
      passwordVisibility: { ...passwordVisibility, [field]: !passwordVisibility[field] },
    })
  }

  handleCreateUser = addUser => () => {
    const { name, email, password } = this.state;
    console.log('handleCreateUser', this.state);
    addUser({ variables: { name , email, password } });
    this.handleClose();
  }

  render() {
    const { open, name, email, password, confirmPassword, passwordVisibility } = this.state;
    const { showConfirmPassword, showPassword } = passwordVisibility;
    return (
      <div>
        <h2>New Here !</h2>
        <Button onClick={this.handleClickOpen} variant="contained" color="primary">
          Create New Account
        </Button>
        <h2>OR</h2>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"> Enter your details:</DialogTitle>
          <DialogContent>
            <TextField
              required
              fullWidth
              id="outlined-name"
              label="Name"
              value={name}
              onChange={this.handleChange('name')}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              required
              fullWidth
              id="outlined-email"
              label="Email"
              value={email}
              onChange={this.handleChange('email')}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container spacing={16} alignContent='space-between' >
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="outlined-password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={this.handleChange('password')}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword('showPassword')}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="outlined-confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={this.handleChange('confirmPassword')}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword('showConfirmPassword')}
                        >
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Mutation mutation={ADD_USER}>
              {(getUser) => (
                <Button variant='contained' onClick={this.handleCreateUser(getUser)} color="primary">
                  Create
                </Button>
                )
              }
            </Mutation>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CreateUser;
