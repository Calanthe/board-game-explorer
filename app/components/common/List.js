// @flow
import React from 'react';

type Props = {
  itemType: Object,
  items: ?Array<Object>
};

export default class List extends React.Component<Props> {
    render() {
        const ItemType = this.props.itemType;
        const items = this.props.items || [];
        const markupItems = this.createItemsMarkup(items, ItemType);

        return (<ul className="ui-list">{markupItems}</ul>);
    }

    createItemsMarkup(items: Array<Object>, Type: Object) {
        const markupItems = items.map((item) => {
            return (
                <li className="ui-list-item" key={item.$.id}>
                    <Type data={item}/>
                </li>
            );
        });

        return markupItems;
    }
}
