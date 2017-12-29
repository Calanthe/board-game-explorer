import React from 'react';
import axios from 'axios';

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
        const markupItems = this.createItemsMarkup(this.state.item);

        return (
            <section className={styles.app}>
                <section className="section-content">
                    {markupItems}
                </section>
            </section>
        );
    }

    createItemsMarkup(items) {
        const markupItems = items.map((item) => {
            return (
                <SingleGameItem key={item.$.id} data={item}/>
            );
        });

        return markupItems;
    }

    componentDidMount() {
        this.constructor.requestData().then((response) => {
            this.setState(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }
}
