import React from 'react'
import gql from "graphql-tag";
import { query } from "react-apollo";
import { CreateUser, Login } from './component';

const ADD_USER = gql`
  query {
    Users(data: {
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

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.state=({});
  }

  check = () => (console.log("hello"))

  render() {
    return (
      <div style={ { display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        {/* <CssBaseline /> */}
        <span style={{ color: 'black', fontSize: '25px'}}>
          <h1>Welcome To My Chat App</h1>
          <hr/>
        </span>
        <CreateUser />
        <Login />
        {/* <div style={{ position: 'fixed', width: '100%', overflow: 'hidden'}}>
          <img src="/images/background-2.jpg" alt="Background Image"/>
        </div> */}
      </div>
    )
  }

}

export default HomePage;
