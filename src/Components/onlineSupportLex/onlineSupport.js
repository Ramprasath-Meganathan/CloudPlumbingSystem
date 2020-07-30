import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { ChatBot } from 'aws-amplify-react';
import LexChat from "lex-chat"; 

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:ce8cbb05-dd98-4050-a984-4f4d0e69a614',
    region: 'us-east-1'
  },
  Interactions: {
    bots: {
      "onlineSupport": {
        "name": "onlineSupport",
        "alias": "$LATEST",
        "region": "us-east-1",
      },
    }
  }
});

class OnlineSupportBot extends Component {
    render() {
      return (
        <div className="App">
            {/* <ChatBot
              title="Welcome to Online Support Module"
              botName="onlineSupport"
              clearOnComplete={true}
            /> */}
            <LexChat 
                 botName="onlineSupport"
                 IdentityPoolId="us-east-1:ce8cbb05-dd98-4050-a984-4f4d0e69a614"
                 placeholder="Type any query"
                 style={{position: 'absolute'}}
                 backgroundColor="#FFFFFF"
                 height="430px"
                 headerText="Online Chat Support" />
        </div>
      );
    }
}

export default OnlineSupportBot;
