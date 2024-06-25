import "./ImageGallery.scss"
import { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const optionsNotify = {
    timeout: 2000,
};
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
const apiKey = '43602379-82b2565bd0b0a0b53c6c265a8';

export default class ImageGallery extends Component {

    constructor() {
        super();
        this.state = {
            contacts: [],
            filter: "",
            random: 0,
            prevRandom: 0,
            data: {},
        };
    }

    async componentDidMount() {
        // const response = await this.fetchPicturesPerPage(this.props.queryImageGallery)
        // this.setState({ data: response })
    }
    async shouldComponentUpdate(nextProps, nextState) {
        const oldProps = this.props

        if (nextProps.queryImageGallery === oldProps.queryImageGallery) {
            console.log("shouldComponentUpdate:false")
            return false;
        }
        console.log("shouldComponentUpdate:true")
        const response = await this.fetchPicturesPerPage(this.props.queryImageGallery)
        this.setState({ data: response })
        return true;
    }


    //Functions
    /**
     * fetchPicturesPerPage
     * @param {string} query - Zapytanie wyszukiwania obrazów
     * @param {number} currentPage - Numer bieżącej strony
     * @returns {Promise<object>} Obiekt zawierający dane o obrazach
     */
    async fetchPicturesPerPage(query, currentPage = 1) {
        const searchParams = new URLSearchParams({
            key: apiKey,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page: currentPage,
        });
        const url = `https://pixabay.com/api/?${searchParams}`;

        const response = await axios.get(url);
        return response.data;
    }

    //Funkcje
    /**
     * loadNextPage
     * * Pobiera i renderuje kolejną stronę obrazków na podstawie podanego zapytania.
     * @param {string} query - Zapytanie wyszukiwania obrazków.
     * @returns {void}
     */
    async loadNextPage(query) {
        let messageNotify = '';
        this.fetchPicturesPerPage(query, 1)
            .then(picturesCollection => {
                if (picturesCollection.hits.length > 0) {

                    if (currentPage === 1) {
                        Notify.success(
                            `Hooray! We found ${picturesCollection.totalHits} images.`,
                            optionsNotify
                        );
                    } else {

                    }
                } else {
                    if (currentPage === 1) {
                        messageNotify = `No results found. Try searching using different query data.`;
                    } else {
                        messageNotify = `We're sorry, but you've reached the end of search results.`;

                    }
                    Notify.info(messageNotify, optionsNotify);
                }
                // currentPage++;
            })
            .catch(error => {
                if (error.message.includes('400')) {
                    messageNotify = `We're sorry, but you've reached the end of search results.`;
                    Notify.info(messageNotify, optionsNotify);

                } else {
                    messageNotify = error;
                    Notify.failure(messageNotify, optionsNotify);
                }
            });
    }
    render() {
        const { filter, contacts } = this.state;
        const { total, totalHits, hits } = this.state.data;
        if (!hits) {
            return null;
        }

        return (
            <ul className="ImageGallery">
                {hits.map((image) => (
                    <ImageGalleryItem
                        key={image.id}
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

