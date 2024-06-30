import "./ImageGallery.scss"
import { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
const apiKey = '43602379-82b2565bd0b0a0b53c6c265a8';

export default class ImageGallery extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            error: null,
        };
    }

    async componentDidMount() {
        await this.fetchPictures(this.props.queryImageGallery, this.props.currentPage);
        console.log("componentDidMount")
    }

    async componentWillUnmount() {
        await this.fetchPictures(this.props.queryImageGallery, this.props.currentPage);
    }

    async shouldComponentUpdate(nextProps, nextState) {
        const oldProps = this.props;
        if (nextProps.queryImageGallery === oldProps.queryImageGallery &&
            nextProps.currentPage === oldProps.currentPage) {
            console.log("shouldComponentUpdate:false")
            return false;
        }
        console.log("shouldComponentUpdate:true")
        return true;
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.queryImageGallery !== this.props.queryImageGallery ||
            prevProps.currentPage !== this.props.currentPage) {
            this.props.handleLoader(true);
            await this.fetchPictures(this.props.queryImageGallery, this.props.currentPage);
            this.props.handleLoader(false);
            console.log("componentDidUpdate")
        }
    }

    async fetchPictures(query, currentPage) {
        try {
            const response = await this.fetchPicturesPerPage(query, currentPage);
            // this.setState({ data: response })
            this.setState((prevState) => {
                const uniquePictures = response.filter(
                    (newPicture) => !prevState.data.some((existingPicture) => existingPicture.id === newPicture.id)
                );
                return { data: [...prevState.data, ...uniquePictures] };
                // return { data: [...uniquePictures] };
            });
        } catch (error) {
            this.setState({ error })
        } finally {
            this.props.handleLoader(false);
        }
    }

    //Functions
    /**
     * fetchPicturesPerPage
     * @param {string} query - Zapytanie wyszukiwania obrazów
     * @param {number} currentPage - Numer bieżącej strony
     * @returns {Promise<object>} Obiekt zawierający dane o obrazach
     */
    async fetchPicturesPerPage(query, currentPage) {
        const searchParams = new URLSearchParams({
            key: apiKey,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page: currentPage,
        });
        if (query) {
            const url = `https://pixabay.com/api/?${searchParams}`;
            console.log(url);
            const response = await axios.get(url);
            const showButton = response.data.hits.length > 0;
            this.props.handleButton(showButton);
            return response.data.hits;
        }
        return [];
    }

    render() {
        const { data } = this.state;

        return (
            <ul className="ImageGallery">
                <li>{data.length}</li>
                {data.map((image) => (
                    <ImageGalleryItem
                        id={image.id}
                        tags={image.tags}
                        webformatURL={image.webformatURL}
                        largeImageURL={image.largeImageURL}
                        openModal={() => this.props.openModal(image.largeImageURL, image.tags)}
                    />
                ))}
            </ul>
        )
    }
}

ImageGallery.propTypes = {
    queryImageGallery: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    handleLoader: PropTypes.func.isRequired,
    handleButton: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
};