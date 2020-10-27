import React from "react";// Importreact
import axios from "axios"; //Import Axios
import { connect } from "react-redux"; // Import connect from react-redux which connects with redux store
import {
    setCurrentUser,
    setLoggedIn
} from "../Actions/personalNotesApp"; // actions required to dispatch redux
import { Footer } from "./Footer.js"; // Import Footer
// Import CSS files
import "../css/signIn.css"; // CSS for Sign Page
import "../css/fonts.css"; // CSS for Fonts

// Initial State
const initialState = {
    email: "",
    password: "",
    warning: "",
};
// SignIn Page  Component
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // get all existing users from api 
    GetUsers() {
        axios({
            method: 'get',
            url: 'API/NotesAPI/AllUsers',
            params: {
                id: this.state.id,
                email: this.state.email,
                password: this.state.password
            }
        })
            .then((res) => {
                this.setState({ statusCode: res.status, response: res.data, waiting: false });
            })
            .catch((err) => {
                this.setState({ statusCode: err.response.status, response: err.response.data, waiting: false });
            });
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // Get All Users
        axios({
            method: 'get',
            url: 'API/NotesAPI/AllUsers',
            params: {
                id: this.state.id,
                email: this.state.email,
                password: this.state.password
            }
        })
            .then((response) => {
                return response.data;

            })
            .then((user) => {
                let userExists = false;
                let matchedUser;
                // prevent sign in attempts with empty fields
                if (
                    this.state.email.trim() === "" ||
                    this.state.password.trim() === ""
                ) {
                    document.querySelector("#warning").innerHTML =
                        "Email and Password must be entered!!";
                }
                // if input fields have values
                else {
                    if (user.email === this.state.email) {
                        if (user.password === this.state.password) {
                            userExists = true;
                            // if a sign in details are valid, store the matched user
                            matchedUser = user;
                        }
                    }
                    // no match for sign in info
                    if (!userExists) {
                        // display an error if no match was found
                        document.querySelector("#warning").innerHTML =
                            "Invalid Sign In credentials. Please check your email or password.";
                    }
                    // if login details were valid
                    else {
                        // store current user
                        this.props.dispatch(setCurrentUser(matchedUser));
                        // set logged in state to true
                        this.props.dispatch(setLoggedIn(true));
                        // redirect the user to readnotes
                        try {
                            this.props.onNavigate.push("/read-notes");
                        } catch (error) {
                            this.props.history.push("/read-notes");
                        }
                    }
                }
            }); // end of async call
    }; // end of handle submit function
    navigateToSignUp() {
        try {
            this.props.onNavigate.push("/SignUp"); // redirect user to SignUp page
        } catch (error) {
            this.props.history.push("/SignUp"); // redirect user to SignUp page
        }
    }
    render() {
        return (
            <div className="signInBody">
                <div className="grid-container" >
                    <div className="main">
                        <h1 className="welcome">Remember Everything</h1>
                        <p className="statementSignIn">
                            Create your own personal notes, edit/delete notes...
                        </p>
                        <p className="statementSignIn">
                            Don’t hassle to pick up notebook to make quick notes...
                        </p>
                        <p className="statementSignIn">
                            User friendly design and features...
                        </p>
                        <section className="fieldSignIn">
                            <form onSubmit={this.handleSubmit}>
                                <div id="warning" onSubmit={this.handleSubmit}></div>
                                <input
                                    className="input1"
                                    type="email"
                                    id="email"
                                    placeholder="Enter Email..."
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <input
                                    className="input2"
                                    type="password"
                                    id="password"
                                    placeholder="Enter Password..."
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <br /><br />
                                <button
                                    className="signIn"
                                    type="submit"
                                    onSubmit={this.handleSubmit}
                                >
                                 {" "}
                                 SIGN IN{" "}
                                </button>
                                <div className="or">
                                    <h2><span>or</span></h2>
                                </div>
                                <button
                                    className="signUp"
                                    onClick={() => {
                                        this.navigateToSignUp();
                                    }}
                                >
                                 SIGN UP{" "}
                                </button>
                            </form>
                        </section>
                    </div>
                    <div className="footer">
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

// use the connect method to connect this component's props to the redux store
// keep redux store values in this.state.store
function mapStateToProps(state) {
    return {
        store: state,
    };
}
export default connect(mapStateToProps)(SignIn);

// Horizontal line: @link https://stackoverflow.com/questions/5214127/css-technique-for-a-horizontal-line-with-words-in-the-middle
