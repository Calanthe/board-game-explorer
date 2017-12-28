import React from 'react';
import {Link} from 'react-router';

export default class SingleGameItem extends React.Component {
    render() {
        const data = this.props.data;
        const link = this.calculateLink(data.$);
        let yearPublished = null;

        if (data.yearpublished && data.yearpublished.length) {
            yearPublished = <span className="published">{data.yearpublished[0].$.value}</span>;
        }

        return (
            <div className="game-list__item">
                <img src={`${data.thumbnail[0].$.value}`}/>
                <div className="info-container">
                    <h4 className="title">{data.name[0].$.value}</h4>
                    year published: {yearPublished}
                </div>
                <Link className="link" to={link}>
                    More Details &#187;
                </Link>
            </div>
        );
    }

    calculateLink(data) {
        return `/game/${data.id}`;
    }
}
