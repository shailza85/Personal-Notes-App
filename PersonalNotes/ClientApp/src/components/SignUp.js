import React from "react"; // Import React
import axios from "axios"; // Import Axios
import { connect } from "react-redux"; // Import coonenct from react-redux
import { updateUsers } from "../Actions/personalNotesApp"; // Actions
import { Footer } from "./Footer.js"; // Import Footer
// Import CSS Files
import "../css/fonts.css"; // CSS for Fonts
import "../css/signUp.css"; // CSS for SignUp Page

// Initial State
const initialState = {
    fname: "",
    lname: "",
    email: "",
    password: ""
};
// SignUp Component
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /* Get all User's Emails*/ 
    GetUserEmail() {
        axios({
            method: 'get',
            url: 'API/NotesAPI/AllUserEmail',
            params: {
                fname: this.state.fname,
                lname: this.state.lname,
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
        this.setState({
            [event.target.id]: event.target.value,
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.password
        };
        const listOfUsers = this.state.response;
        let userExists = false;
        if (typeof listOfUsers === "object" && listOfUsers.length > 0) {
            for (let olduser of listOfUsers) {
                // Check the email with current user Input
                if (olduser.email === this.state.email) {
                    userExists = true;
                }
            }
        }

        // Form Validations...
        if (this.state.email.trim() === "" || this.state.fname.trim() === "" || this.state.lname.trim() === "" || this.state.password.trim() === "") {
            if (this.state.fname.trim() === "") { // Check if First Name is Empty
                document.querySelector("#fnameWarning").innerHTML =
                    "First Name cannot be blank.";
            }
            else {
                document.querySelector("#fnameWarning").innerHTML = "";
            }

            if (this.state.lname.trim() === "") { // Check if Last Name is Empty
                document.querySelector("#lnameWarning").innerHTML = "Last Name cannot be blank.";
            }
            else {
                document.querySelector("#lnameWarning").innerHTML = "";
            }

            if (this.state.email.trim() === "") {  // Check if Email is Empty
                document.querySelector("#emailWarning").innerHTML = "Email Id cannot be blank.";
            }

            else {
                document.querySelector("#emailWarning").innerHTML = "";
            }

            if (this.state.password.trim() === "") {  // Check if Password is Empty
                document.querySelector("#passwordWarning").innerHTML = "Password cannot be blank.";
            }
            else {
                document.querySelector("#passwordWarning").innerHTML = "";
            }
        }
        else if (userExists) { // If the user Exists (Email Id Id already exists in Database)... Display this Message
            document.querySelector("#emailWarning").innerHTML =
                "This email already exists. Please use another Email Id to Sign Up!!";
        }

        else {
            document.querySelector("#emailWarning").innerHTML = ""; 
            document.querySelector("#successful").innerHTML = "Account created successfully!!! Please Sign In to continue...";
            listOfUsers.push(user);
            this.setState(initialState);
        }

        //send new user Data using Put method
        axios({
            method: 'put',
            url: 'API/NotesAPI/SignUp',
            params: {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.password
            }
        })
            .then((response) => {
                this.props.dispatch(updateUsers(listOfUsers));
            });
    };
    navigateToSignIn() {
        try {
            this.props.onNavigate.push("/SignIn"); // Navigate to Sign In Page
        } catch (error) {
            this.props.history.push("/SignIn");// Navigate to Sign In Page
        }
    }
    render() {

        return (
            <>
                <div className="signUpBody">
                    <div class="header">
                    </div>
                    <div class="grid-containerSignUp">
                        <div class="mainSignUp">
                            <div className="backBlue">
                                <h1 className="signUpTitle"> Sign-Up Form </h1>
                                <form onSubmit={this.handleSubmit} className="signUpForm">
                                    {this.GetUserEmail()}
                                    <input className="inputSignUp"
                                        type="text"
                                        id="fname"
                                        placeholder="Enter First Name..."
                                        value={this.state.fname}
                                        onChange={this.handleChange}
                                        pattern="[a-zA-Z]+"
                                        title="First Name should not contain any numbers."
                                        required
                                    /><br />
                                    <input className="inputSignUp"
                                        type="text"
                                        id="lname"
                                        placeholder="Enter Last Name..."
                                        value={this.state.lname}
                                        onChange={this.handleChange}
                                        pattern="[a-zA-Z]+"
                                        title="Last Name should not contain any numbers."
                                        required
                                    /><br />
                                    <div id="emailWarning"></div>
                                    <input className="inputSignUp"
                                        type="email"
                                        id="email"
                                        placeholder="Enter Email..."
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        required
                                    /><br />
                                    <input className="inputSignUp"
                                        type="password"
                                        id="password"
                                        placeholder="Enter Password..."
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <br />
                                    <div id="successful"></div>
                                    <button className="buttonSignUp" type="submit" onSubmit={this.handleSubmit}>
                                        {" "}  SIGN UP
                        </button><br />
                                    <button className="buttonSignIn" onClick={() => { this.navigateToSignIn() }}> SIGN IN </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="signUpFooter">
                        <Footer />{/* Footer*/}
                    </div>
                </div>
            </>
        );
    }
}
function mapStateToProps(state) {
    return {
        store: state,
    };
}
export default connect(mapStateToProps)(SignUp);



//HTML pattern attribute for non-number input fields. @link: https://webdesign.tutsplus.com/tutorials/html5-form-validation-with-the-pattern-attribute--cms-25145
