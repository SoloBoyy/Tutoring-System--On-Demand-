import Button from 'react-bootstrap/Button';
import React from 'react'
import {Chat} from './chat.js'


class ChatButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showComponent: false,
      };
      this._onButtonClick = this._onButtonClick.bind(this);
    }
  
    _onButtonClick() {
      this.setState({
        showComponent: true,
      });
    }
  
    render() {
      return (
        <div>
          <Button onClick={this._onButtonClick}>Button</Button>
          {this.state.showComponent ?
             <Chat /> :
             null
          }
        </div>
      );
    }
  }
  export default ChatButton;