import React from 'react';

class List extends React.Component {
    render() {
        const { clickOnItemProp } = this.props;
        return (
            <ul>
                <li onClick={clickOnItemProp} role="presentation">Scools</li>
                <li onClick={clickOnItemProp} role="presentation">Pharmacies</li>
                <li onClick={clickOnItemProp} role="presentation">Restaurants</li>
            </ul>
        );
    }
}
export default List;
