import React from 'react';

export default class SingleGameItem extends React.Component {
    render() {
        const data = this.props.data;
        let yearPublished = null;

        if (data.yearpublished && data.yearpublished.length) {
            yearPublished = <span className="published">{data.yearpublished[0].$.value}</span>;
        }

        return (
            <div className="bill compact-bill">
                <img src={`${data.thumbnail[0].$.value}`}/>
                <div className="info-container">
                    <h4 className="title">{data.name[0].$.value}</h4>
                    {yearPublished}
                </div>
            </div>
        );
    }
}
