import React, { Component } from 'react';// Import React 
import axios from 'axios';// Import axios
import { Header } from './Header';//Import Header 
import { Footer } from './Footer';//Import Footer

import "../css/createNotes.css";// Import CSS

// Initial State 
const initialState = {
    description: "",
    date: "",
    msg: "",
    response: []
};

// Create Notes Component
// The name of the class is used in routing in App.js. The name of the file is not important in that sense.
export class CreateNotes extends Component {
    static displayName = CreateNotes.name;
    constructor(props) {
        // 1) When we build the component, we assign the state to be loading, and register an empty list in which to store our forecasts.
        super(props);
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        switch (event.target.id) {
            case "description":
                this.setState({ description: event.target.value });
                break;
            case "date":
                this.setState({ date: event.target.value });
                break;
            default:
                break;
        }
    }
    // Either way we render the title, and a description.
    render() {
        return (
            <div className="createNoteBody">
                <div className=" header-nav">
                    <Header /> {/* Header */}
                </div>
                <div class="grid-containerCreateNote">
                    <div class="mainCreateNote">
                        <h1 className="tabelLabel" >Create Notes</h1>
                        <form onSubmit={this.handleSubmit} className="createNoteForm">
                            {/* TextArea for Description*/}
                            <textarea id="description" value={this.state.description} onChange={this.handleChange} placeholder="Enter description..." required ></textarea>
                            <br />
                            {/* Input for Date...Type = "Date" create default calender input.*/}
                            <input id="date" type="date" value={this.state.date} onChange={this.handleChange} required />
                            <div className="successfulNote">{this.state.message}</div>
                            {/* Submit Form Button*/}
                            <button type="submit" value="Submit" className="submitButton">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="createNoteFooter">
                    <Footer sticky="true" /> {/* Footer */}
                </div>
            </div>
        );
    }
    async handleSubmit(event) {
        event.preventDefault();
        // Add Notes to Database using post method and API/NotesAPI/CreateNotes API
        axios({
            method: 'post',
            url: 'API/NotesAPI/CreateNotes',
            params: {
                description: this.state.description,
                date: this.state.date,
            }
        })
            .then((res) => {
                this.setState({ response: res.data, message: "Note created successfully." });
            })
            .catch((err) => {
                this.setState({ response: err.response.data });
            });
        this.setState(initialState);
    }
}
// Display success message:
//@link https://stackoverflow.com/questions/51660947/parse-axios-alert-message-into-react-dom
//@link https://dev.to/cesareferrari/how-to-display-error-messages-in-a-react-application-3g48
//Placeholder formatting:@link: https://stackoverflow.com/questions/38487394/how-to-set-the-color-and-font-style-of-placeholder-text/38487446
