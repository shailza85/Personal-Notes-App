import React, { Component } from 'react'; // Import React
import { ReadNotes } from './ReadNotes'; // ReadNotes Page
import axios from 'axios'; // Import Axios

/* Import CSS Files*/
import "../css/home.css"; // Home Page(Share Note)
import "../css/fonts.css"; // Fonts CSS

// Homepage Component
export class HomePage extends Component {
    static displayName = HomePage.name;
    constructor(props) {
        // 1) When we build the component, we assign the state to be loading, and register an empty list in which to store our forecasts.
        super(props);
        this.state = { notes: [], loading: true };
    }

    componentDidMount() {
        // 2) When the component mounts, we make the async call to the server to retrieve the API results.
        this.populateNotesData();
    }
    async populateNotesData() {
        // 3) Make the async call to the API.
        // When an async call is made, it "awaits" a response. This means that rather than the server hanging and keeping the "thread" (process) open, it shelves the thread to be picked up when the response comes back.
        // This frees up server resources to do other things in the event the request takes a few seconds (or more, if your internet is straight out of 1995).

        // Axios replaces fetch(), same concept. Send the response and "then" when it comes back, put it in the state.
        axios.get('API/NotesAPI/AllNotes').then(res => {
            this.setState({ notes: res.data, loading: false });
           // Response = res.data.map(x => x.id);
        });
    }

    render() {
        const path = this.props.location.pathname;
        let id;
        if (path !== "/") {
            //we have query string
            var query = path.replace("/", "");
            query = query.replace("share/", "");
            id = query.replace("$Note=", "");
        }
        // 4) When we render, this ternary statement will with print loading, or render the forecasts table depending if the async call has come back yet.
        // Either way we render the title, and a description.
        return (
            <>
                <ReadNotes
                    id={id}
                />
            </>
        );
    }
}

    


