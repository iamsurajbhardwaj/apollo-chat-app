import React from "react";
import TextField from "@material-ui/core/TextField";
import { Search } from "@material-ui/icons/";
import IconButton from "@material-ui/core/IconButton";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

const GET_USERS = gql`
  query {
    users {
      name
      email
    }
  }
`;

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: 20,
  },
  row: {
    // "&:nth-of-type(odd)": {
    //   backgroundColor: "yellow"
    // },
    // "&:nth-of-type(even)": {
    //   backgroundColor: "green"
    // },
    "&:hover": {
      backgroundColor: theme.palette.grey[400]
    }
  }
});

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value
    });
  };

  getUsers = () => (
    <Query query={GET_USERS} pollInterval={3}>
      {({ loading, error, data }) => {
        const { classes, user: loggedUser } = this.props;
        // if (loading) return <p>Loading...</p>;
        if (error) return <p>Error! ${error.message}</p>;
        if (data.users) {
          const userList = data.users.map(user => {
            if (user.email !== loggedUser.email) {
              return (
                <>
                  <TableRow className={classes.row} key={user.email}>
                    <CustomTableCell>
                      <Link
                        className={classes.link}
                        to={{
                          pathname: "/loggedIn",
                          state: {
                            user: loggedUser,
                            chatTo: { email: user.email, name: user.name }
                          }
                        }}
                      >
                        <p>{user.name}</p>
                      </Link>
                    </CustomTableCell>
                  </TableRow>
                </>
              );
            }
            return null;
          });
          return userList;
        }
        return null;
      }}
    </Query>
  );

  render() {
    const { user } = this.props;
    const { search } = this.state;
    // console.log("stateUsersComponent", this.state);
    return (
      <div>
        <div style={{ paddingLeft: "10px", color: "Blue" }}>
          <h3>{user.name}</h3>
        </div>
        <hr color="green" />
        <TextField
          fullWidth
          id="outlined-Search"
          placeholder="Search"
          value={search}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange("search")}
          InputProps={{
            endAdornment: (
              <IconButton aria-label="Search-User">
                <Search color="primary" />
              </IconButton>
            )
          }}
        />
        <div style={{ overflowY: "scroll", overflow: "auto", height: "300px" }}>
          <Table>
            <TableBody>{this.getUsers()}</TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Users);
