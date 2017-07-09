import React from 'react';
import axios from 'axios';

export default class DetailedGame extends React.Component {
    static get NAME() {
        return 'DetailedGame';
    }

    static get contextTypes() {
        return {
            data: React.PropTypes.object
        };
    }

    static requestData(params, domain = '') {
        return axios.get(`${domain}/api/game/${params.id}`);
    }

    constructor(props, context) {
        super(props, context);
        this.state = context.data[DetailedGame.NAME] || {};
    }

    render() {
        console.log(this.state)

        return (
            <section className="latest-bills">
                <header className="section-header">
                    <h3 className="title">Games Details</h3>
                </header>
            </section>
        );
    }

    componentDidMount() {
        this.constructor.requestData(this.props.params).then((response) => {
            // return response.json();
            this.setState(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }
}
