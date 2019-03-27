import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Send } from '@material-ui/icons/';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Button } from '@material-ui/core';
import { Mutation } from 'react-apollo';

const getChat = gql`
  query {
    chats{
      sentBy
      email
      message
    }
  }`

  const ADD_CHAT = gql`
  mutation chats ($data: ChatCreateInput!) {
    createChat(data: $data) {
      email
      sentBy
      message
    }
  }
`;

class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state =({
    });
  }

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleCreateChat = createChat => () => {
    const {message } = this.state;
    createChat({ variables: { data: { email: localStorage.getItem('email') , message , sentBy: localStorage.getItem('name') } } });
    this.setState({
      message: "",
    })
  }

  getMessage = (messages) => {
    if(messages) {
      const messageCheck = messages.map((message) => {
      if(message.email === localStorage.getItem('email')){
        return(
          <div key={message.message} style={
            {
            float: "right",
            position: "relative",
            clear: "both",
            background: "#95c2fd",
            padding: "1px",
            borderRadius: "3px",
            marginBottom: "10px",
            color: "black",
            }
          }>
            <p style={{color: "red", background: "white"}}>{message.sentBy}:</p>
            <p>{message.message}  ◄</p>
          </div>
        )
      }else {
        return(
          <div key={message.message} style={
            {
            float: "left",
            position: "relative",
            clear: "both",
            background: "#95c2fd",
            padding: "1px",
            borderRadius: "3px",
            marginBottom: "10px",
            color: "black",
            }
          }>
            <p style={{color: "red", background: "white"}}>{message.sentBy}:</p>
            <p>►  {message.message}</p>
          </div>
        )
      }
    });
    return messageCheck;
    }
    return null;
  }

  render() {
    const { data: { chats } } = this.props;
    return(
      <div>
        <div style={{paddingLeft: "10px", color: "red", textAlign: "right"}}>
          <h2>My Chat App</h2>
        </div>
        <hr color="blue"/>
        <div style={{overflowY: "scroll",overflow: "auto", height: "300px"}}>
          { this.getMessage(chats) }
        </div>
        <TextField
          fullWidth
          id="standard-SendMessage"
          placeholder="Type Your Message Here"
          margin="normal"
          variant="standard"
          onChange={this.handleChange('message')}
          InputProps={{
            endAdornment: (
              <Mutation mutation={ADD_CHAT}>
                  {(createChat, { data }) => (
                    <IconButton
                    aria-label="Send-Message"
                    onClick={this.handleCreateChat(createChat)}
                  >
                    <Send color="primary" />
                  </IconButton>
                    )
                  }
            </Mutation>
            ),
          }}
        />
      </div>
    );
  }
}

export default graphql(getChat)(Chat);
