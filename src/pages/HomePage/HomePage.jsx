import React from 'react'
import { CreateUser } from './component';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.state=({});
  }

  render() {
    return (
      <div style={ { display: 'flex', flexDirection: 'column' }}>
        {/* <CssBaseline /> */}
        <span style={{ color: 'black', fontSize: '25px', marginBottom: '50px'}}>
          <h1>Welcome To My Chat App</h1>
          <hr/>
        </span>
        <CreateUser />
        {/* <div style={{ position: 'fixed', width: '100%', overflow: 'hidden'}}>
          <img src="/images/background-2.jpg" alt="Background Image"/>
        </div> */}
      </div>
    )
  }

}

export default HomePage;
