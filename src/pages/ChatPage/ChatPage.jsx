import React from 'react'
import Paper from '@material-ui/core/Paper';
import { Chat, Users } from './component';

class ChatPage extends React.Component {
  constructor (props) {
    super(props);
    this.state=({});
  }

  render() {
    const { location: { state: { user, chatTo } } } = this.props;
    return (
      <div style={ { display: 'flex', flexDirection: 'column'}}>
        <span style={{ color: 'black', fontSize: '25px', textAlign: "center" }}>
          <h1>Start Chatting</h1>
        </span>
        <Paper elevation={20}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ paddingLeft: "10px", paddingRight: "10px", width: "20%", borderStyle: "ridge"}}>
              <Users user={user} />
            </div>
            <div style={{ paddingLeft: "10px", paddingRight: "10px", width: "80%", borderStyle: "ridge"}}>
              <Chat chatTo={chatTo} user={user} />
            </div>
          </div>
        </Paper>
      </div>
    )
  }

}

export default ChatPage;
