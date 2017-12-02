// @flow
import React from 'react';

type Props = {};

export default class NoMatch extends React.Component<Props> {
    render() {
        return (
            <section className="app-content">
                <header className="section-header">
                    <h3 className="title">Not Found</h3>
                </header>
            </section>
        );
    }
}
