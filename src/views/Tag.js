import React, { Component } from 'react';
import Tag from '../components/Tag';

class TagView extends Component {
    render() {
        return (
            <div>
                <h1>Tag 标签</h1>
                <div className="k-example">
                    <Tag />
                </div>
            </div>
        )
    }
}

export default TagView;