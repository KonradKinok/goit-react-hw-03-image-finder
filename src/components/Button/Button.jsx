import "./Button.scss"
import { Component } from "react";
import PropTypes from "prop-types";

export default class Button extends Component {
    constructor() {
        super();
    }

    handlePaginationButton = () => {
        this.props.handlePagination();
    };
    render() {
        return (
            <>
                <button type="button" className="button" onClick={this.handlePaginationButton}>Load more </button>
            </>
        )
    }
}

Button.propTypes = {
    handlePagination: PropTypes.func.isRequired,
};