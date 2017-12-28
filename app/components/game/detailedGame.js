import React from 'react';
import axios from 'axios';

function br2nl(str) {
    return str.replace(/<br\s*\/?>/mg, '\n');
}

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
        let gameDesc = null;

        if (data.name && data.name.length > 1) {
            gameTitle = <h4>{data.name[1]._}</h4>;
        } else if (data.name && data.name.length) {
            gameTitle = <h4>{data.name[0]._}</h4>;
        }

        gameDesc = br2nl(data.description[0]);

        return (
            <section className="game-item">
                <header className="game-item__title">
                    {gameTitle}
                </header>
                <img src={`${data.image}`} className="game-item__pic"/>
                <p className="game-item__desc dashed">{gameDesc}</p>
                <p className="game-item__author">
                    <span className="bold">by</span> {data.boardgamedesigner[0]._}</p>
                <p className="game-item__machanics">
                    <span className="bold">Mechanic:</span> {data.boardgamemechanic[0]._},
                    {data.boardgamemechanic[1]._},
                    {data.boardgamemechanic[2]._}
                </p>
                <p>
                    <span className="bold">players:</span> {data.minplayers[0]}
                    - {data.maxplayers[0]}</p>
                <p>
                    <span className="bold">playing time:</span> {data.minplaytime[0]}
                    - {data.maxplaytime[0]}</p>
                <p>
                    <span className="bold">year published:</span> {data.yearpublished[0]}</p>
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
