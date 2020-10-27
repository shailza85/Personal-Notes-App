import React, { Component } from 'react'; // Import react
import axios from 'axios';// Import Axios

import { Header } from "./Header.js"; // Import Header
import { Footer } from "./Footer.js"; // Import Footer


// Import react-icons/fa
import { FaEdit, FaShare, FaTrash, FaPrint } from 'react-icons/fa';

// Import CSS Files
import "../css/readNotes.css"; // CSS for ReadNotes Page
import "../css/fonts.css"; // CSS for Fonts

// ReadNotes Component
export class ReadNotes extends Component {
    static displayName = ReadNotes.name;
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

        //Send the response and "then" when it comes back, put it in the state.
        axios.get('API/NotesAPI/AllNotes').then(res => {
            this.setState({ notes: res.data, loading: false });
            //Response = res.data.map(x => x.id);
        });
    }

    /*PrintNotes method: Print the Notes*/

    printNotes(e) {
        const PId = ".print-" + e.target.closest("span").dataset.id;
        // HTML print
        // source: https://stackoverflow.com/questions/12997123/print-specific-part-of-webpage
        let prtContent = document.querySelector(PId); //grab the info from Notes
        let WinPrint = window.open('', 'printwindow'); //Pop Up (open) Print Dialog Box
        WinPrint.document.write('<html lang="en-ca"><head><title>Print it!</title><style>body {text-align: center;}</style></head><body>');
        WinPrint.document.write(prtContent.innerHTML);
        WinPrint.document.write('</body></html>');
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    }

    /*copyToClipBoard method: copy the particular note link and User can share it to others.*/
    // source : https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    copyToClipBoard = (e) => {
        const Id = e.target.closest("span").dataset.id
        let link = "https://localhost:44368/share/$Note=" + Id; //queryString with note id
        navigator.clipboard.writeText(link).then(function () {
            console.log(`Copy to clipboard success: ${link}`);
            // ToolTip  
            let tooltipText = document.querySelector(".share-tooltiptext");
            tooltipText.innerHTML = "Copied Link";
            setTimeout(() => {
                tooltipText.innerHTML = "Share Link";
            }, 1200);
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    /*Delete() method: delete a particular note.*/
    Delete(e) {
        const delId = e.target.closest("span").dataset.id;
        axios({
            method: 'put',
            url: 'API/NotesAPI/DeleteNote',
            params: {
                id: delId,
            }
        })
            .then(response => {

                //const notes = this.state.notes.filter(note => note.id !== delId);
                this.state.notes.filter(note => note.id !== delId);
                this.setState({ notes: response.data.notes });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /*onEditHandle method: edit a particular note.*/
    onEditHandle(e) {
        this.setState({
            edit: true,
            id: arguments[0],
            description: arguments[1]
        });
    }

    /*onUpdateHandle method: update a particular note.*/
    onUpdateHandle(e) {
        e.preventDefault();
        axios({
            method: 'put',
            url: 'API/NotesAPI/EditNotes',
            params: {
                id: this.state.id,
                description: e.target.updatedItem.value
            }
        })
            .then(response => {
                this.setState({
                    notes: this.state.notes.map(note => {
                        if (note.id === this.state.id) {
                            note['description'] = response.data.description;
                            return note;
                        }
                        return note;
                    })
                });
            })
            .then(response => {
                this.setState({
                    edit: false
                });
            })
    }

    renderEditForm() {
        if (this.state.edit) {
            //Edit(Update) Notes 
            return <form onSubmit={this.onUpdateHandle.bind(this)}>
                <div className="renderUpdateForm">
                    <textarea name="updatedItem" className="item" defaultValue={this.state.description} />
                    <button className="update-add-item">Update</button>
                </div>
            </form>
        }
    }

    render() {
        // 4) When we render, this ternary statement will with print loading, or render the forecasts table depending if the async call has come back yet.
        // console.log(this.props);
        var newNotes = this.state.notes;
        if (this.props.id != null) {
          // Filter all Notes by Id 
            newNotes = this.state.notes.filter(x => x.id == this.props.id);
        }
       
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderNotesTable(newNotes);

        // Either way we render the title, and a description.
        return (
            <>
                <div className="notesBody">
                    <div className="notesHeader">
                        <Header /> {/* Header*/}
                    </div>
                    <div className="notesTable">
                        <h1 className="tabelLabel" >Notes</h1>
                        {contents}
                    </div>
                </div>
            </>
        );
    }

    renderNotesTable(notes) {

        // 5) When the async call comes back, render will call this method rather than rendering "Loading...", which will create our table.
        return (
            <>
                <div className="notesBody">
                    <div className="grid-containerNotes">
                        <div className="mainNotes">
                            <div className="notesData">
                                {this.renderEditForm()}{/* Render a Edit Form*/}
                                {/* maps all Notes Data */}
                                {notes.map(note =>
                                    <p key={note.id} className="pNotes">
                                        <span>{note.date}</span> {/* Display Date*/}
                                        <br /><br />
                                        <span className={"print-" + note.id}>{note.description}</span>
                                        <br /><br />
                                        {/* Print Notes Data*/}
                                        <span data-id={note.id} onClick={this.printNotes} className="tooltip"><FaPrint className="icon" />
                                        <span className="tooltiptext">Print</span>&nbsp;&nbsp;&nbsp;</span>
                                        {/* Copy Link and Share Notes */}
                                        <span data-id={note.id} onClick={this.copyToClipBoard} className="tooltip"><FaShare className="icon" />
                                         <span className="tooltiptext share-tooltiptext">Share</span>&nbsp;&nbsp;&nbsp;</span>
                                        {/* Delete Note*/}
                                        <span data-id={note.id} onClick={this.Delete.bind(this)} className="tooltip"><FaTrash className="icon" />
                                        <span className="tooltiptext">Delete</span>&nbsp;&nbsp;&nbsp;</span>
                                        {/* Edit(Update) Note*/}
                                        <span onClick={this.onEditHandle.bind(this, note.id, note.description)} className="tooltip"><FaEdit className="icon" />
                                         <span className="tooltiptext">Edit</span>&nbsp;&nbsp;&nbsp;</span>
                                        <br />
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="notesFooter">
                            <Footer sticky="true" /> {/* Footer */}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
