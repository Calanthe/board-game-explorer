import React from 'react';
import {IndexLink} from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
            <header className="app-header">
                <h1 className="title">
                    <IndexLink to={this.props.root} className="link">
                      <span className="bold colored">B</span>oard
                      <span className="bold colored"> G</span>ame
                      <span className="bold colored"> E</span>xplorer
                    </IndexLink>
                </h1>
                <h3 className="title dashed">
                  The latest and most popular board games based on bgg
                </h3>
            </header>
        );
    }
}
