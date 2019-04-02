import { User } from './constants';

const Query = {
  getChat: (parent, { email, sentTo }) => {
    return User.filter(data => ( (data.email === email && data.sentTo === sentTo) || (data.email === sentTo && data.sentTo === email)));
  }
}

export default Query;
