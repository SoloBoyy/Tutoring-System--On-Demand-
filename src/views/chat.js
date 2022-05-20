import React, { Component } from 'react'
// Import CSS styles for Chat page
import './chat.css'
// Import Bootstrap components from react-bootstrap
import { FormControl, ListGroup,Card, Row, Col } from 'react-bootstrap';
import { useAuth0} from '@auth0/auth0-react';
// Import the axios library
import axios from 'axios'
// Import the Pusher JS library
import Pusher from 'pusher-js'




class ClassChat extends Component {
  // The state is initialized in the constructor and the functions below are bound with 'this'.
 
    constructor() {
        super();
        this.state = {
            value: '',
            username: '',
            messages: []
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    // componentWillMount() is invoked immediately before mounting occurs and we are setting the username state to the value gotten from props
    componentWillMount() {
       console.log(typeof this.props.u_name);

        this.setState({ username: this.props.u_name });
        // Establish a connection to Pusher.
        this.pusher = new Pusher('0c34ed219ee5573abfa3', {
            authEndpoint: '/pusher/auth',
            cluster: 'us2',
            encrypted: true
        });
        // Subscribe to the 'private-reactchat' channel
        this.chatRoom = this.pusher.subscribe('private-reactchat');//user1-user2-private
    }
    // componentDidMount() is invoked immediately after a component is mounted. Listen for changes to the 'messages' state via Pusher and updates it.
    componentDidMount() {
        this.chatRoom.bind('messages', newmessage => {
            this.setState({messages: this.state.messages.concat(newmessage)})
        }, this);

    }
    // Used to update the value of the input form in which we type in our chat message
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    // This sends the message inside the input form and sends it to Pusher.
    sendMessage(event) {
        event.preventDefault();
        if (this.state.value !== '') {
            axios.post('/message/send', {
                username: this.state.username,
                message: this.state.value
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
            this.setState({value: ''})
        }
        else {
            // console.log('enter message')
        }
    }
    render() {
        // Renders the chat messages
        const messages = this.state.messages;
        const message = messages.map(item => {
            return (
                     
                        <div class="chat-message-left pb-4">
								<div>
                                    
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:34 am</div>
								</div>
								<div key={item.id} class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">{item.username}</div>
									{item.message}
								</div>
							</div>
            )
        })
        // Renders the input form where the message to be sent is typed.
        return (
            <ListGroup>
                 <main class="content">
             <h4 className="text-center">Welcome, {this.state.username}</h4>
             <h5 className="text-center">Begin chatting here.</h5>
    <div class="container p-0">

		<h1 class="h3 mb-3">Messages</h1>

		<div class="card">
			<div class="row g-0">
				<div class="col-12 col-lg-5 col-xl-3 border-right">

					<div class="px-4 d-none d-md-block">
						<div class="d-flex align-items-center">
							<div class="flex-grow-1">
								<input type="text" class="form-control my-3" placeholder="Search..."></input>
							</div>
						</div>
					</div>
                    <hr class="d-block d-lg-none mt-1 mb-0"></hr>
				</div>
				<div class="col-12 col-lg-7 col-xl-9">
					<div class="py-2 px-4 border-bottom d-none d-lg-block">
						<div class="d-flex align-items-center py-1">
							<div class="position-relative">
								<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
							</div>
							<div class="flex-grow-1 pl-3">
								<strong>{this.state.username}</strong>
								<div class="text-muted small"><em>Student</em></div>
							</div>
							<div>
								<button class="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
								<button class="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
								<button class="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
							</div>
						</div>
					</div>
                    <div class="position-relative">
						<div class="chat-messages p-4">
                           
                            {message}
                        	
                            <div class="flex-grow-0 py-3 px-4 border-top">
						<div class="input-group">
                        <Row className="show-grid">
                    <Col xs={12}>
                    
                        <div className="chat-container">
                            <form onSubmit={this.sendMessage}>
                                <Col xs={20} xsoffset={50}>
                                    <FormControl
                                        type="text"
                                        value={this.state.value}
                                        placeholder="Enter message here"
                                        onChange={this.handleChange}
                                    />
                                </Col>
                                
                              
                            </form>
                        </div>
                    </Col>
                </Row>
                <input className="btn btn-primary" value="Send" type="submit" />
                                
						</div>
					</div>
						</div>
					</div>
                </div>
                </div>
                </div>
                </div>
                </main>

                
            </ListGroup>
        )
    }
}

export const Chat = () => {
    const {user} = useAuth0();
    //console.log(user.nickname);
    console.log(user)
  
    return <ClassChat u_name={user.nickname}/>
  }
  


export default Chat;
