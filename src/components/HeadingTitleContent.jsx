import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
function HeadingTitleContent(props) {
    return (
        <div className="content__employee-title">
            <h3><GoPrimitiveDot />{props.children}</h3>
        </div>
    );
}

export default HeadingTitleContent;