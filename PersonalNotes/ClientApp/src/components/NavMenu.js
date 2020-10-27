import React from "react"; // Import react
import { Link, withRouter } from "react-router-dom"; // Import Link and WithRouter From react-router-dom
import { connect } from "react-redux"; // Import connect from react-redux
import { logout } from "../Actions/personalNotesApp"; // Actions

//Nav displays the menu links on the page.
class NavMenu extends React.Component {

    logout() {
        this.props.dispatch(logout());
        this.props.history.push("/SignIn");
    }

    renderLogout() {
        if (this.props.store.isLoggedIn) {
            return (
                <Link to="#" className="header-li" onClick={() => this.logout()}>LogOut</Link> //Logout 
            );
        }
    }

    render() {
        return (
            <div className="Nav">
                <ul>
                    <li className="header-li">
                        <Link to="/read-notes" className="Link2">Read</Link>{/* Redrirect to Read Notes Page*/}
                        <Link to="/create-notes" className="Link1">Create</Link> {/* Redrirect to Create Note Page*/}
                        {this.renderLogout()}
                    </li>
                </ul>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        store: state,
    };
}
export default withRouter(connect(mapStateToProps)(NavMenu));
