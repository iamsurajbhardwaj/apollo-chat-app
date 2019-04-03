import React from 'react'
import { CreateUser, Login } from './component';

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
          <h1> Welcome To My Chat App<span role="img" aria-label="emoji" >🚀</span> </h1>
          <hr/>
        </span>
        <CreateUser />
        <Login />
      </div>
    )
  }

}

export default HomePage;
