import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Send } from '@material-ui/icons/';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

const GET_CHAT = gql`
  query {
    chats{
      sentBy
      email
      message
      sentTo
    }
  }`

  const ADD_CHAT = gql`
  mutation chats ($data: ChatCreateInput!) {
    createChat(data: $data) {
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
      message: ''
    });
  }

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleCreateChat = createChat => () => {
    const { message } = this.state;
    const { chatTo, user } = this.props;
    this.setState({
      message: "",
    })
    createChat({ variables: { data: { email: user.email , message , sentBy: user.name, sentTo: chatTo.email } } });
  }

  getMessage = () => (
    <Query
      query={GET_CHAT}
      pollInterval={3}
    >
    {({ loading, error, data }) => {
      const { chatTo, user } = this.props;
      // if (loading) return <p>Loading...</p>;
      if (error) return <p>Error! ${error.message}</p>;
      if(data.chats && chatTo) {
        const chatMessage = data.chats.map((message) => {
          console.log('chat Component', message.sentTo, chatTo.email);
        if(message.email === user.email && chatTo.email === message.sentTo){
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
        }
        if (message.email === chatTo.email && message.sentTo === user.email) {
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
      return chatMessage;
      }
      return null;
    }}
  </Query>
  )

  render() {
    const { chatTo } = this.props;
    console.log('chatComponent', chatTo)
    return(
      <div>
        <div>
          <span style={{ color: "Blue", textAlign: "left"}}>
            <h2>{chatTo ? chatTo.name: ''}</h2>
          </span>
          <span style={{ color: "red", textAlign: "right"}}>
            <h2>My Chat App</h2>
          </span>
        </div>
        <hr color="blue"/>
        <div style={{overflowY: "scroll",overflow: "auto", height: "300px"}}>
          { this.getMessage() }
        </div>
        {
          chatTo ?
            (
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
            ) : ''
        }
      </div>
    );
  }
}

export default Chat;
// graphql(getChat)
