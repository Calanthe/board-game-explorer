import React from 'react';
import axios from 'axios';

import List from '../common/List';
import SingleGameItem from './SingleGameItem';

import styles from './latestGames.css';

export default class LatestGames extends React.Component {
    static get NAME() {
        return 'LatestGames';
    }

    static get contextTypes() {
        return {
            data: React.PropTypes.object
        };
    }

    static requestData(params, domain = '') {
        return axios.get(`${domain}/api/latest-games`);
    }

    constructor(props, context) {
        super(props, context);
        this.state = context.data[LatestGames.NAME] || {items: []};
    }

    render() {
        return (
            <section className={styles.app}>
                <section className="section-content">
                    <List items={this.state.item} itemType={SingleGameItem}/>
                </section>
            </section>
        );
    }

    componentDidMount() {
        this.constructor.requestData().then((response) => {
            this.setState(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }
}
