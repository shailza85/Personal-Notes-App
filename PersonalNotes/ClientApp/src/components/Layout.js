import React, { Component } from 'react'; // Import React
import { Container } from 'reactstrap'; // Import Container from reactstrap
import { Header } from './Header'; // Import Header
import { Footer } from './Footer'; // Import Footer

// Layout Component
export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <Header /> {/* Header*/}
                <Container>
                    {this.props.children}
                </Container>
                <Footer />{/* Footer*/}
            </div>
        );
    }
}
