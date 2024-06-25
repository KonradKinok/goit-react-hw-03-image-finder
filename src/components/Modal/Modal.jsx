import "./Modal.scss"
import { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';

export default class Modal extends Component {

    constructor() {
        super();

    }
    componentDidMount() {
        window.addEventListener('keydown', this.handleEsc);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEsc);
    }

    handleEsc = (event) => {
        if (event.keyCode === 27) {
            this.props.closeModal();
        }
    };

    handleClickOutside = (event) => {
        if (event.target === event.currentTarget || event.keyCode === 27) {
            this.props.closeModal();
        }
    };
    render() {
        const { imgUrlModal, tagModal } = this.props;
        return (
            <div className="overlay" onClick={this.handleClickOutside}>
                <div className="modal" >
                    <img src={imgUrlModal} alt={tagModal} />
                </div>
            </div>
        )
    }
}