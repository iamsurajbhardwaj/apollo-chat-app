import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Send } from '@material-ui/icons/';
import gql from 'graphql-tag';
import { Mutation, Query, graphql } from 'react-apollo';

const GET_CHAT = gql`
  query {
    chats{
      sentBy
      email
      message
      sentTo
    }
  }`

  // const GET_CHAT = gql`
  // query($where: ChatWhereInput!) {
  //   chats(where: $where){
  //     sentBy
  //     email
  //     message
  //     sentTo
  //   }
  // }`

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
    createChat({ variables: { data: { email: user.email , message , sentBy: user.name, sentTo: chatTo.email } } });
    this.setState({
      message: '',
    })
  }

  componentWillMount() {
this.forceUpdate()  }

componentWillUnmount() {
  console.log('will unmount')
}

  getMessage = () => (
    <Query
      query={GET_CHAT}
      // variables={{where:
      //   { "OR" : {email: "bhardwajsuraj@mail.com", sentTo: "shubhamsoni@mail.com"}     }}}
      pollInterval={3}
    >
    {({ loading, error, data }) => {
      console.log('Chat check', data.chats)
      const { chatTo, user } = this.props;
      const { chats } = data;
      console.log('chats >>>>>>>>>>>>>', chats, chatTo);
      // if (loading) return <p>Loading...</p>;
      if (error) return <p>Error! ${error.message}</p>;
      if(chats && chatTo) {
        let chatMessage = [];
        console.log('>>>>>>>>>', chatMessage);
        chats.forEach((message) => {
        if(message.email === user.email && chatTo.email === message.sentTo){
          console.log('get chat', message.email, user.email, chatTo.email, message.sentTo )
          chatMessage.push(
            <div key={`${message.email}`} style={
              {
              float: "right",
              position: "relative",
              clear: "both",
              padding: "1px",
              border: "1px solid",
              borderRadius: "3px",
              marginBottom: "10px",
              color: "black",
              }
            }>
              <p style={{color: "blue"}}>{message.sentBy}:</p>
              <p>{message.message}  ◄</p>
            </div>
          )
        }
        else if (message.email === chatTo.email && message.sentTo === user.email) {
          console.log('get chat', message.email, chatTo.email, message.sentTo, user.email )
          chatMessage.push(
            <div key={message.email} style={
              {
              float: "left",
              position: "relative",
              clear: "both",
              padding: "1px",
              border: "1px solid",
              borderRadius: "3px",
              marginBottom: "10px",
              color: "black",
              }
            }>
              <p style={{color: "blue"}}>{message.sentBy}:</p>
              <p>►  {message.message}</p>
            </div>
          )
        }
      });
      console.log('chatmessage', chatMessage);
      return chatMessage;
      }
      return null;
    }}
  </Query>
  )

  render() {
    const { chatTo } = this.props;
    const { message } = this.state;
    return(
      <div style={{boxSizing: "content-box", border: "none"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <span style={{ color: "Blue", textAlign: "left"}}>
            <h2>{chatTo ? `TO► ${chatTo.name}`: ''}</h2>
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
                value={message}
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

// export default Chat;
export default graphql(GET_CHAT)(Chat);
