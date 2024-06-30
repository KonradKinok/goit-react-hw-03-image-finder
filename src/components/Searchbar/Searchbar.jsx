import "./Searchbar.scss"
import { Component } from "react";
import PropTypes from "prop-types";
import icon from "../../Images/icons.svg";

export class Searchbar extends Component {
    constructor() {
        super();
        this.state = {
            searchInputValue: "",
        };
    }

    clickButtonSearch = (event) => {
        event.preventDefault();
        this.props.handleSearch(this.state.searchInputValue);
    };

    handleInputSearchChange = (ev) => {
        const { name, value } = ev.currentTarget;
        this.setState(() => {
            return {
                [name]: value,
            }
        });
    };

    render() {
        const { searchInputValue } = this.state;
        return (
            <header className="searchbar">
                <form className="searchForm">
                    <button type="submit" className="searchForm-button" onClick={this.clickButtonSearch}>
                        <svg className="" width="16" height="16">
                            <use xlinkHref={`${icon}#icon-search`} />
                        </svg>
                    </button>
                    <input
                        className="searchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={searchInputValue}
                        name="searchInputValue"
                        onChange={this.handleInputSearchChange}
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};