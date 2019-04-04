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
    getAllUser {
      name
      email
    }
  }
`;

// const USER_SUBSCRIPTION = gql`
//   subscription {
//     newUser {
//       name
//       email
//     }
//   }
// `

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
    minWidth: 190
  }
}))(TableCell);

const styles = theme => ({
  link: {
    textDecoration: "none",
    color: "black",
  },
  row: {
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
      {({ error, data }) => {
        const { classes, user: loggedUser } = this.props;
        const { getAllUser } = data;
        if (error) return <p>Error! ${error.message}</p>;
        if (getAllUser) {
          const userList = getAllUser.map(user => {
            if (user.email !== loggedUser.email) {
              return (
                    <TableRow className={classes.row} key={user.email}>
                      <CustomTableCell >
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
                          {user.name}
                        </Link>
                      </CustomTableCell>
                    </TableRow>
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
    return (
      <div style={{paddingRight: "5px", paddingLeft: "5px", }}>
        <div style={{display: "flex"}}>
          <img src="/images/sender.png" alt="receiver-avatar" style={{borderRadius: "50%", height: "50px", width: "auto", padding: "10px"}} />
          <h3>{user.name}</h3>
        </div>
        <hr color="green" />
        <TextField
          id="outlined-Search"
          placeholder="Search"
          value={search}
          onClick={() => alert('This Feature will be available in Future UPDATES !')}
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
