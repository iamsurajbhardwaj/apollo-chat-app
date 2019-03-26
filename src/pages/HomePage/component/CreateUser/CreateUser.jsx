import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';
import { Email, Person, Visibility, VisibilityOff, EuroSymbol } from '@material-ui/icons/';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const addUser = gql`
  mutation {
    createUser(data: {
      email: "bhardwajSuraj320@mail.com"
      name: "Suraj Bhardwaj"
      gender: "Male"
      password: "my@password"
    }) {
      email
      name
      gender
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
    // birthday: '',
    gender: '',
    passwordVisibility: {
      showPassword: false,
      showConfirmPassword: false,
    },
  };

  // getDate = () => {
  //   let today = new Date();
  //   const dd = String(today.getDate()).padStart(2, '0');
  //   const mm = String(today.getMonth() + 1).padStart(2, '0');
  //   const yyyy = today.getFullYear();
  //   today =  yyyy + '-' + mm + '-' + dd;
  //   return today;
  // }

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

  render() {
    const { open, name, email, password, gender, confirmPassword, passwordVisibility } = this.state;
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
            {/* <Grid container spacing={16} alignContent='space-between' > */}
              {/* <Grid item xs={6}>
                <TextField
                required
                fullWidth
                id="outlined-birthday"
                label="Birthday"
                type="date"
                defaultValue={this.getDate()}
                onChange={this.handleChange('birthday')}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid> */}
              {/* <Grid item xs={16}> */}
                <TextField
                  required
                  fullWidth
                  id="outlined-gender"
                  label="Gender"
                  value={gender}
                  onChange={this.handleChange('gender')}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EuroSymbol />
                      </InputAdornment>
                    ),
                  }}
                />
              {/* </Grid> */}
            {/* </Grid> */}
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
            <Button variant='contained' onClick={this.handleClose} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default graphql(addUser)(CreateUser);
