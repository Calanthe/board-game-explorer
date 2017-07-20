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
        const data = this.state;
        let gameTitle = null;
        // console.log(data.name.length, data.name[1]) //TODO test Gloomhaven, maybe no array

        if (data.name && data.name.length > 1) {
            gameTitle = <h4>{data.name[1]._}</h4>;
        } else if (data.name && data.name.length) {
            gameTitle = <h4>{data.name[0]._}</h4>;
        }

        return (
            <section className="latest-bills">
                <header className="section-header">
                    {gameTitle}
                </header>
                <p>{data.description}</p>
            </section>
        );
    }

    componentDidMount() {
        this.constructor.requestData(this.props.params).then((response) => {
            this.setState(response);
        }).catch((err) => {
            console.log(err);
        });
    }
}
