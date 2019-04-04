import React from 'react';
import { TextField, AppBar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Send } from '@material-ui/icons';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';


const GET_CHAT = gql`
  query($email: String!, $sentTo: String!) {
    getChat(email: $email, sentTo: $sentTo){
      email
      sentBy
      sentTo
      message
    }
  }`

  const ADD_CHAT = gql`
  mutation ($email: String!, $sentTo: String!, $sentBy: String!, $message: String!) {
    sendMessage(email: $email, sentTo: $sentTo, sentBy: $sentBy, message: $message  ) {
      email
      message
      sentBy
      sentTo
    }
  }
`;

class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state =({
      message: '',
      close: true,
    });
  }

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleCreateChat = sendMessage => {
    const { message } = this.state;
    const { chatTo, user } = this.props;
    sendMessage({ variables: { email: user.email , sentTo: chatTo.email, sentBy: user.name, message  } });
    this.setState({
      message: '',
    })
  }

handleKey = (event, sendMessage) => {
  const x = event.key;
  if(x === "Enter") {
  this.handleCreateChat(sendMessage);
  }
}


  getMessage = (data) => {
    const { getChat } = data;
    const { chatTo, user } = this.props;
    let chatMessage = [];
    let id = 0;
    if(getChat) {
      getChat.forEach((message) => {
        if(message.email === user.email){
          id += 1;
          chatMessage.push(
            <div
              key={`${message.email}.${id}`}
              style={
                {
                  float: "right",
                  display: "flex",
                  justifyContent: "flex-end",
                  clear: "both",
                  position: "relative",
                  fontWeight: "bolder",
                  border: "2px solid #ccc",
                  backgroundColor: "#ddd",
                  borderRadius: "5px",
                  padding: "10px",
                  margin:" 10px 0",
                  width: "97%"
                }
              }
            >
              <p style={{paddingRight: "20px", float: "right"}}>{message.message}</p>
              <img src="/images/sender.png" alt="receiver-avatar" style={{borderRadius: "50%", height: "30px", width: "auto", paddingRight: "10px"}} />
            </div>
          )
        }
        if(message.email === chatTo.email){
          id += 1;
          chatMessage.push(
            <div
              key={`${message.email}.${id + 1}`}
              style={
                {
                  float: "left",
                  display: "flex",
                  clear: "both",
                  position: "relative",
                  fontWeight: "bold",
                  border: "2px solid #dedede",
                  backgroundColor: "#f1f1f1",
                  borderRadius: "5px",
                  padding: "10px",
                  margin:" 10px 0",
                  width: "97%"
                }
              }
            >
              <img src="/images/receiver.png" alt="receiver-avatar" style={{borderRadius: "50%", height: "30px", width: "auto", paddingLeft: "10px"}} />
              <p style={{paddingLeft: "20px"}}>{message.message}</p>
            </div>
          )
        }
      })
    }
    return chatMessage;
  }

  render() {
    const { chatTo, user } = this.props;
    const { message, close } = this.state;
    return(
      <div style={{boxSizing: "content-box", border: "none"}}>
      <AppBar position="static">
      {
        (chatTo && close) ?
          <div style={{display: "flex"}}>
            <img src="/images/receiver.png" alt="receiver-avatar" style={{borderRadius: "50%", height: "50px", width: "auto", padding: "10px"}} />
            <span style={{ color: "white"}}>
              <h1>{chatTo.name}</h1>
            </span>
            {/* <p>
              <IconButton onClick={() => (this.setState({close: false}))}>
                <Close />
              </IconButton>
            </p> */}
          </div>: <h1 style={{textAlign: "center"}}>Select User to Chat!</h1>  
      }
        
      </AppBar>
        <div style={{overflowY: "scroll",overflow: "auto", height: "470px"}}>
          {
            (chatTo && user && close) ?
            <Query query={GET_CHAT} variables={{email: user.email, sentTo: chatTo.email}} pollInterval={3}>
              {
                ({ data }) => (this.getMessage(data))
              }
            </Query>: ''
          }
        </div>
        {
          chatTo ?
            (
              <Mutation mutation={ADD_CHAT}>
                        {(sendMessage) => (
              <TextField
                fullWidth
                id="standard-SendMessage"
                placeholder="Type Your Message Here"
                value={message}
                margin="normal"
                variant="standard"
                onChange={this.handleChange('message')}
                onKeyPress={(e) => ((e.key === "Enter")? this.handleCreateChat(sendMessage): '')}
                InputProps={{
                  endAdornment: (
                    
                          <IconButton
                          aria-label="Send-Message"
                          onClick={() => this.handleCreateChat(sendMessage)}
                          >
                          <Send color="primary" />
                          </IconButton> 
                        
                  ),
                }}
              />
              )
                        }
                  </Mutation>
            ) : ''
        }
      </div>
    );
  }
}

export default Chat;
