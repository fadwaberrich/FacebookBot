import MessengerCustomerChat from 'react-messenger-customer-chat';

import logo from './logo.svg';
import './App.css';

function App() {
    return ( 
        <div className = "App" >
        <header className = "App-header" >
        <img src = { logo }
        className = "App-logo"
        alt = "logo" / >
        <p> Edit <code> src / App.js </code> and save to reload. </p>
        <a className = "App-link"
        href = "https://reactjs.org"
        target = "_blank"
        rel = "noopener noreferrer">Learn React </a> 
        </header> 
        <MessengerCustomerChat
            pageId = "105249325385455"
            appId = "343428747618172"
            htmlRef = "" />
        </div>
    );
}
export default App;