import React, { Component } from 'react'; // Import React
import { FaGithubSquare, FaEnvelopeSquare } from 'react-icons/fa'; // Import React-Icons

// Footer Component
export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        // Font Awesome Element
        const githubIcon = <FaGithubSquare className="follow-icon" />
        const emailIcon = <FaEnvelopeSquare className="follow-icon" />

        //sticky Footer
      let sticky = "";
         if (this.props.sticky === "true") {
             sticky = "sticky";
         }
        return (
            <footer className={sticky}>
                <div className="footer-p">
                    <span className="follow-span">
                        {/* Social Icon Links...Redirect to Github and Email default Page*/}
                        <p className="social_icon">
                            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" > {githubIcon} </a>
                            <a href="https://www.gmail.com" target="_blank" rel="noopener noreferrer" > {emailIcon} </a>
                        </p>
                        <label className="footer-label">SS&H<span>2020 &copy;</span><span>Reserved</span></label>
                    </span>
                </div>
            </footer>
        )
    }
}
