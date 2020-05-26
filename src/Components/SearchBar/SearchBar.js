import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            term: ''
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    search(){
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event){
        this.setState({ term: event.target.value });
    }

    handleKeyDown(event){
        if(event.keyCode === 13){
            this.props.onSearch(this.state.term);
            event.preventDefault(); //prevents the default action of clicking a link from triggering at the end of the method
        }
    }

    render() {
        return(
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyDown={this.handleKeyDown}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;