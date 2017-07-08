import React from 'react';
import {IndexLink} from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
            <header className="app-header">
                <h1 className="title">
                    <IndexLink to={this.props.root}>Board Game Explorer</IndexLink>
                </h1>
            </header>
        );
    }
}
