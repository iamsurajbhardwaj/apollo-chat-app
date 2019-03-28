import React from 'react'
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Chat, Users } from './component';

class ChatPage extends React.Component {
  constructor (props) {
    super(props);
    this.state=({});
  }

  render() {
    const { location: { state: { user, chatTo } } } = this.props;
    console.log('chatPage', user, chatTo);
    return (
      <div style={ { display: 'flex', flexDirection: 'column'}}>
        <span style={{ color: 'black', fontSize: '25px', textAlign: "center"}}>
          <h1>Spread Happiness Through Your Beautiful Words !</h1>
        </span>
        <Paper elevation={20}>
          <div style={{ paddingRight: "15px" }}>
          <Grid container spacing={16} alignContent='space-between'>
              <Grid item xs={3}>
                <div style={{ fontWeight: "bold", fontSize: "20px" , paddingLeft: "10px", paddingRight: "10px"}}>
                  <Users user={user} />
                </div>
              </Grid>
              <Grid item xs={9}>
                <div style={{ paddingLeft: "10px", paddingRight: "10px"}}>
                  <Chat chatTo={chatTo} user={user} />
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    )
  }

}

export default ChatPage;
