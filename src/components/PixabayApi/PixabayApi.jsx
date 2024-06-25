import { Component } from "react";
import PropTypes from "prop-types";
import scss from "./PixabayApi.module.scss";
import axios from 'axios';
import { Searchbar } from "../Searchbar/Searchbar"
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";


export class PixabayApi extends Component {

    constructor() {
        super();
        this.state = {

            queryPixabayApi: "",
            isModalOpen: false,
            imgUrlModal: "https://pixabay.com/get/gc3e117989f3cb8c434278740ec1912c48eda6c89aefe3fb6f33eaf41487336392d1ef36ab750470b7ecb927259996a869db5e43b7c22e83521c84f62cc0f7de1_1280.jpg",
            tagModal: "",
        };
    }


    handleSearch = (query) => {
        this.setState({ queryPixabayApi: query })
    }

    openModal = (imgUrlModal, tagModal) => {
        this.setState({
            imgUrlModal: imgUrlModal,
            tagModal: tagModal,
            isModalOpen: true,
        })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    render() {
        const { queryPixabayApi, isModalOpen, imgUrlModal, tagModal } = this.state;
        return (
            <div >
                <Searchbar handleSearch={this.handleSearch} />
                {/* <ContactForm addContact={this.addContact} contacts={contacts} /> */}

                <h2>{queryPixabayApi}</h2>
                <ImageGallery queryImageGallery={this.state.queryPixabayApi} openModal={this.openModal} />
                {isModalOpen && <Modal closeModal={this.closeModal} imgUrlModal={imgUrlModal} tagModal={tagModal} />}
            </div>
        )
    }
}

