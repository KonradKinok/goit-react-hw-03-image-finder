import "./Searchbar.scss"
import { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';

export class Searchbar extends Component {

    constructor() {
        super();
        this.state = {
            contacts: [],
            filter: "",
            searchInputValue: "",
            prevRandom: 0,
        };
    }


    clickButtonSearch = (event) => {
        event.preventDefault();
        this.props.handleSearch(this.state.searchInputValue);
    };
    // handleInputChange = (event) => {
    //     this.setState(() => {
    //         const searchValue = event.target.value;

    //         return {
    //             searchWord: searchValue,
    //         }
    //     });
    // };
    handleInputSearchChange = (ev) => {
        const { name, value } = ev.currentTarget;
        this.setState(() => {
            return {
                [name]: value,
            }
        });
    };
    render() {
        const { searchInputValue, contacts } = this.state;
        // const { searchWord } = this.props;
        return (
            <header className="searchbar">
                <form className="searchForm">
                    <button type="submit" className="searchForm-button" onClick={this.clickButtonSearch}>
                        <span className="searchForm-button-label">Search</span>
                    </button>
                    <input
                        className="searchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={searchInputValue}
                        name="searchInputValue"
                        onChange={this.handleInputSearchChange} // Dodanie obsługi zdarzenia onChange
                    />
                </form>
            </header>
        )
    }
}

