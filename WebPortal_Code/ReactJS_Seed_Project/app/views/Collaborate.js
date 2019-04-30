import React, { Component } from 'react';
import Iframe from 'react-iframe'
import MessengerCustomerChat from 'react-messenger-customer-chat';

class Collaborate extends Component {
   
    render() {
        <MessengerCustomerChat
                            pageId="2303444623040399"
                            appId="852099055140915"/>
        return (
            
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <h1>
                                ARc Collaboration Space
                                
                            </h1>
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <Iframe url="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Farclearning&tabs=events%2Cmessages%2Ctimeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                width="500px"
                                height="700px"
                                display="initial"
                                position="relative"/>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }

}

export default Collaborate