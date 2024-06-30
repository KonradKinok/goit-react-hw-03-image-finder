import "./ImageGalleryItem.scss"
import { Component } from "react";
import PropTypes from "prop-types";

export default class ImageGalleryItem extends Component {
    constructor() {
        super();
    }

    render() {
        const { id, tags, webformatURL } = this.props;
        return (
            <li key={id} data-key={id} className="ImageGalleryItem" onClick={this.props.openModal}>
                <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
            </li>
        )
    }
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
};