import { RotatingLines } from 'react-loader-spinner'
import { Component } from "react";
import PropTypes from "prop-types";

export default class Loader extends Component {
    constructor() {
        super();
    }

    render() {
        const { isLoaderVisible } = this.props;
        return (
            <>
                <RotatingLines
                    visible={isLoaderVisible}
                    height="96"
                    width="96"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </>
        )
    }
}

Loader.propTypes = {
    isLoaderVisible: PropTypes.bool.isRequired,
};