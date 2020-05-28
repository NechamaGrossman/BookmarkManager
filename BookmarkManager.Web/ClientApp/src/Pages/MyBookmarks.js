import React from 'react'
import axios from 'axios'
import { produce } from 'immer'
import MyBookmarkDisplay from '../components/MyBookmarkDisplay';

class MyBookmarks extends React.Component {
    state = {
        bookmarks: [],
        url:'',
        editMode: false
    }

    componentDidMount = async () => {
        await this.refreshBookmarks();
    }
    onEditClick = () => {
        this.setState({ editMode: true });
    }
    onStopClick = () => {
        this.setState({ editMode: false })
    }
    onDeleteClick = async(bookmark) => {
        await axios.post('/api/Bookmark/DeleteBookmark', bookmark);
        this.refreshBookmarks();
    }
    refreshBookmarks = async () => {
        const { data } = await axios.get('/api/Bookmark/getbookmarksforuser');
        this.setState({ bookmarks: data });
    }
    onSubmitClick = async (bookmark) => {
        const { url } = this.state;
        await axios.post('/api/bookmark/EditBookMark', { id:bookmark.id, url:url })
        this.setState({ editMode: false });
        await this.refreshBookmarks();
    }
    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft.url= e.target.value;
        });
        this.setState(nextState);
    }
    render() {
        return (
            <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 10 }}>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.bookmarks.map((b, key) => {
                            return <MyBookmarkDisplay bookmark={b}
                                key={key}
                                url={this.state.url}
                                onTextChange={e => { this.onTextChange(e) }}
                                onEditClick={this.onEditClick}
                                onSubmitClick={() => { this.onSubmitClick(b) }}
                                onStopClick={this.onStopClick}
                                editMode={this.state.editMode}
                                onDeleteClick={() => { this.onDeleteClick(b) }}
                            />
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default MyBookmarks;