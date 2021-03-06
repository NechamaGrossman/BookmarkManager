﻿import React from 'react'
import axios from 'axios';
import produce from 'immer';

class HomeDisplay extends React.Component {
    render() {
        const { url, count } = this.props.bookmark
        return (
            <tr>
                <td><a href={url} target="_blank">{url}</a></td>
                <td>{count}</td>
            </tr>
        )
    }


}
export default HomeDisplay;