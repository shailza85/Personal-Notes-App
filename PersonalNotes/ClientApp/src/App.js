import React from "react"; // Import react
import SignIn from "./components/SignIn"; // SignIn Page

// App Component
class App extends React.Component {
    render() {
        return (
            <div>
                <SignIn onNavigate={this.props.history} />      
            </div>
        );  
    }
}
export default App;