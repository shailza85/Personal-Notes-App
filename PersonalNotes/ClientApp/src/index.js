import React from 'react'; // Import React
import ReactDOM from 'react-dom'; // Import ReactDom 
import { BrowserRouter as Router, Route } from "react-router-dom"; // Import BrowserRouter as Router and Route 
import App from './App'; // Import App
import registerServiceWorker from './registerServiceWorker'; // Import registerServiceWorker
import { createStore } from "redux"; // Import createStore from Redux
import { Provider } from "react-redux"; //Import Provider from react-redux
import SignUp from "./components/SignUp"; // SignUp Page
import SignIn from "./components/SignIn"; // SignIn Page
import { ReadNotes } from "./components/ReadNotes"; // ReadNotes Page
import { CreateNotes } from './components/CreateNotes'; // CreateNotes Page
import { HomePage } from "./components/HomePage"; // HomePage(Share Note)
import { setLoggedIn } from "./Actions/personalNotesApp"; // Actions
import personalNotesAppReducer from "./Reducers/personalNotesAppReducer"; // Reducers


//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
//const rootElement = document.getElementById('root');

// create a new redux store
const store = createStore(personalNotesAppReducer);

// log the updated store to the console whenever a change occurs
store.subscribe(() => {
    //console.log(store.getState());
});

// set the logged in value to false
store.dispatch(setLoggedIn(false));

//Adding Nav links
const Root = (store) => (
    <Provider store={store.store}>
        <Router>
            
            <Route path="/" component={App} exact /> {/* Redirect to App Page*/}
            <Route path="/SignIn" component={SignIn} />{/* Redirect to SignIn Page*/}
            <Route path="/SignUp" component={SignUp} /> {/* Redirect to SignUp Page*/}         
            <Route path="/read-notes" component={ReadNotes} />{/* Redirect to ReadNotes Page*/}
            <Route path="/share" component={HomePage} />{/* Redirect to HomePage(For Share  Note*/}
            <Route path="/create-notes" component={CreateNotes} exact />{/* Redirect to Create Notes Page*/} 
          
        </Router>
    </Provider>
);

ReactDOM.render(
    <Root store={store} />,
    document.getElementById("root")
);

registerServiceWorker();

