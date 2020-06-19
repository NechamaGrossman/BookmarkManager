import React from 'react'
import axios from 'axios'
import immer from 'immer'
import HomeDisplay from '../components/HomeDisplay'
class Home extends React.Component {
    state = {
        bookmarks: [],
        home:true
    }
    
    componentDidMount =async () => {
        const { data } = await axios.get('/api/Bookmark/GetTopBookmarks');
        this.setState({ bookmarks: data });
    }
    render() {
        return (
            <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 10 }}>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Amount of users that saved this URL</th>
                    </tr>
                </thead>
                <tbody>
                        {this.state.bookmarks.map((b, key) => {  return <HomeDisplay bookmark={b} key={key} /> })}
                    </tbody>
            </table>
            </div>
        )
    }
}
export default Home;