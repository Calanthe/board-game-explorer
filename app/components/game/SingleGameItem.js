import React from 'react';
import {Link} from 'react-router';

export default class SingleGameItem extends React.Component {
    render() {
        const data = this.props.data;
        const link = this.calculateLink(data.$);

        return (
            <div className="game-list__item">
                <div>
                    <Link className="link" to={link}>
                      <h4 className="title">{data.name[0].$.value}</h4>
                    </Link>
                </div>
                <img src={`${data.thumbnail[0].$.value}`}/>
            </div>
        );
    }

    calculateLink(data) {
        return `/game/${data.id}`;
    }
}
