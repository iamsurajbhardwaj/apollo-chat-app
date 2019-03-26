import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Send } from '@material-ui/icons/';

const message = [ "hey", "hello", "where?", 'any wherre', "bye" ];

class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state =({});
  }

  // getSender = (messages) => {
  //   const messageCheck = messages.map((message) => (
  //     <div style={{ marginTop: "10px", }}>
  //       <p>{message}</p>
  //     </div>
  //   ));
  //   return messageCheck;
  // }

  getMessage = (messages) => {
    const messageCheck = messages.map((message) => (
      <div key={message} style={
        {
        float: "left",
        width: "auto",
        maxWidth: "80%",
        position: "relative",
        clear: "both",
        background: "#95c2fd",
        padding: "5px",
        borderRadius: "3px",
        marginBottom: "10px",
        color: "black",
        }
      }>
        <p>{message}</p>
      </div>
    ));
    return messageCheck;
  }

  render() {
    return(
      <div>
        <hr/>
        {this.getMessage(message)}
        <TextField
          fullWidth
          id="filled-SendMessage"
          placeholder="Type Your Message Here"
          margin="normal"
          variant="standard"
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="Send-Message"
              >
                <Send color="primary" />
              </IconButton>
            ),
          }}
        />
      </div>
    );
  }
}

export default Chat;
