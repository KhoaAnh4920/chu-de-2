import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalPlaylist.scss'
import { CommonUtils } from '../../utils';
import Swal from 'sweetalert2';


class ModalPlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPlaylist: {},
            playlistName: '',
            image: '',
            description: '',
            imagePreviewUrl: '',
            fileName: '',
        };


    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {


        if (this.props.dataPlaylist && Object.keys(prevState.dataPlaylist).length === 0) {
            this.setState({
                dataPlaylist: this.props.dataPlaylist,
                playlistName: this.props.dataPlaylist.playlistName,
                image: this.props.dataPlaylist.image,
                description: this.props.dataPlaylist.description,
                imagePreviewUrl: this.props.dataPlaylist.image,
            })
        }
    }

    _handleImageChange = async (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result,
                    image: base64,
                    fileName: file.name
                });
            }

            reader.readAsDataURL(file)
        }


    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOpenUploadFile = () => {
        this.refs.fileUploader.click();
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['playlistName']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
            }
        }

        if (!isValid) {
            Swal.fire({
                title: 'Missing data?',
                text: "Vui lòng điền tên playlist!",
                icon: 'warning',
            })
        }
        return isValid;
    }


    handleSaveEdit = async () => {
        let isValid = this.checkValidateInput();
        if (isValid) {

            this.props.saveEditPlaylist(this.state);

        }

    }






    render() {
        console.log("Check sate: ", this.state)

        let { dataPlaylist, image, playlistName, description, imagePreviewUrl } = this.state;


        return (
            <div>

                <Modal className={'modal-edit-playlist-user'} isOpen={this.props.isOpen} toggle={() => { this.toggle() }} centered>
                    <ModalHeader toggle={() => { this.toggle() }} className='editdetail'>Edit details</ModalHeader>
                    <ModalBody className='modal-body-container'>
                        <div className='modal-playlist-body'>
                            <div className='image-edit-playlist'>
                                <img className='image-playlist' src={imagePreviewUrl} onClick={() => this.handleOpenUploadFile()} />

                                <input
                                    id='uploadFile'
                                    ref="fileUploader"
                                    accept="image/*"
                                    hidden type='file'
                                    onChange={(e) => this._handleImageChange(e)}
                                />
                            </div>
                            <div className='input-container'>
                                <input type='text'
                                    value={playlistName}
                                    className='inputName'
                                    onChange={(event) => this.handleOnChangeInput(event, 'playlistName')}
                                    placeholder='Add a name' />
                                {/* <input type='text' placeholder='Add an optional description'></input> */}
                                <textarea className='form-control description-playlist'
                                    placeholder='Add an optional description'
                                    onChange={(event) => this.handleOnChangeInput(event, 'description')}
                                    value={description}
                                >
                                </textarea>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className='modal-footer-container'>
                        <Button color="primary" className='btn btn-save-edit' onClick={() => this.handleSaveEdit()}>Save</Button>{' '}
                        <p className='text-license'>By proceeding, you agree to give Spotifake access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPlayList);