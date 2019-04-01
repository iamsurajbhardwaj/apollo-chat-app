import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { Email, VisibilityOff, Visibility } from '@material-ui/icons/';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const getUser = gql`
  query {
    users{
      name
      email
      password
    }
  }`


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
});
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: '',
      name: '',
      email: '',
      password: '',
      showPassword: false,
      login: false,
    };
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword });
  };

  handleChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  // handleLoginClick = () => {
  //   const { name, email } = this.state;
  //   localStorage.setItem('email', email );
  //   localStorage.setItem('name', name);
  // }

  handleAuth = () => {
    const { data: { users } } = this.props;
    const { email, password } = this.state;
    if (users && email) {
      const authData = users.find((user) => {
        if (user.email === email) return user;
      }
      );
      if(authData.email === email && authData.password === password) {
        this.setState({
          login: true,
          name: authData.name
        })
        // localStorage.removeItem('email');
        // localStorage.removeItem('name');
        return authData;
      };
      return null;
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    const { name, email, password, showPassword, login } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper elevation="20" className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            id="outlined-email"
            label="Email"
            className="email"
            value={email}
            onChange={this.handleChange('email')}
            margin="normal"
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="outlined-password"
            label="Password"
            className="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={this.handleChange('password')}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {
            login
            ? (<Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                // onClick={() => this.handleLoginClick()}
              >
                <Link to={{ pathname: '/loggedIn', state: { user: {email: email,name: name}} }}>
                Login
                </Link>
              </Button>)
            : <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => this.handleAuth()}
                className={classes.submit}
              >
                verify
              </Button>
            }
          <p>© Successive Technologies</p>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default graphql(getUser)(withStyles(styles)(Login));
