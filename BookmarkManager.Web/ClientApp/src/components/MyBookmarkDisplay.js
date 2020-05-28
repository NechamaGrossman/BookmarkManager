import React from 'react'
import axios from 'axios';
import produce from 'immer';

class MyBookmarkDisplay extends React.Component {
    render() {
        const { bookmark, onEditClick, editMode, onStopClick, onTextChange, onSubmitClick, onDeleteClick } = this.props
        return (
            <tr>
                {editMode ? <td><input onChange={onTextChange} name="editUrl"defaultValue={bookmark.url} ></input></td>
                    :       <td><a href={bookmark.url}> {bookmark.url} </a></td>}
                {editMode ? <td><button className='btn btn-primary' onClick={onSubmitClick}>Submit</button><button className='btn btn-success' onClick={onStopClick}>Stop Edit Mode</button></td>
                    :       <td><button className='btn btn-success' onClick={onEditClick} >Edit</button></td>}
                            <td><button className='btn btn-danger' onClick={onDeleteClick}>Delete</button></td>
            </tr>
            )
        }
    
    
    }
export default MyBookmarkDisplay;