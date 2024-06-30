import { Component } from "react";
import PropTypes from "prop-types";
import "./PixabayApi.scss";
import { Searchbar } from "../Searchbar/Searchbar"
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Loader from "../Loader/Loader"


export class PixabayApi extends Component {
    constructor() {
        super();
        this.state = {
            queryPixabayApi: "",
            currentPage: 1,
            isModalOpen: false,
            isLoaderVisible: false,
            isButtonVisible: false,
            imgUrlModal: "",
            tagModal: "",
        };
    }

    handleSearch = (query) => {
        this.setState({
            queryPixabayApi: query,
            currentPage: 1,
        })
    }

    handlePagination = () => {
        this.setState((prevState) => ({
            currentPage: prevState.currentPage + 1
        }));
    }

    handleLoader = (isLoaderVisible) => {
        this.setState({ isLoaderVisible })
    }

    handleButton = (isButtonVisible) => {
        this.setState({ isButtonVisible })
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
        const { queryPixabayApi, currentPage, isModalOpen, isLoaderVisible, isButtonVisible, imgUrlModal, tagModal } = this.state;
        return (
            <div className="app">
                <Searchbar handleSearch={this.handleSearch} />
                {isLoaderVisible ?
                    (<Loader isLoaderVisible={isLoaderVisible} />) :
                    (<ImageGallery handleLoader={this.handleLoader} handleButton={this.handleButton} queryImageGallery={queryPixabayApi} currentPage={currentPage} openModal={this.openModal} />)}
                {isButtonVisible && <Button handlePagination={this.handlePagination} />}
                {isModalOpen && <Modal closeModal={this.closeModal} imgUrlModal={imgUrlModal} tagModal={tagModal} />}
            </div>
        )
    }
}

