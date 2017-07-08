import React from 'react';

import List from '../common/List';
import SingleGameItem from './SingleGameItem';

export default class LatestGames extends React.Component {
    static get contextTypes() {
        return {
            data: React.PropTypes.object
        };
    }

    constructor(props, context) {
        super(props, context);
        this.state = context.items || {items: []};
    }

    render() {
        return (
            <section className="latest-games">
                <header className="section-header">
                    <h3 className="title">Latest Games</h3>
                </header>
                <section className="section-content">
                    <List items={this.state.items} itemType={SingleGameItem}/>
                </section>
            </section>
        );
    }

    componentDidMount() {
        fetch('/api/latest-games').then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({items: data.item});
        }).catch((err) => {
            throw new Error(err);
        });
    }
}
