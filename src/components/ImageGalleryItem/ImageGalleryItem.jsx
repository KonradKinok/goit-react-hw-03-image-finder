import "./ImageGalleryItem.scss"
import { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';

export default class ImageGalleryItem extends Component {

    constructor() {
        super();
        this.state = {
            contacts: [],
            filter: "",
            random: 0,
            prevRandom: 0,
        };
    }

    render() {
        const { filter, contacts } = this.state;
        const { id, tags, webformatURL } = this.props;
        return (
            <li key={id} className="ImageGalleryItem" onClick={this.props.openModal}>
                <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
            </li>
        )
    }
}