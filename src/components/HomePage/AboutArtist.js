import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.scss';
import './Playlist.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Share/Header';
import Sidebar from '../Share/Sidebar';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import $ from "jquery";
import sol7 from '../../assets/images/artist/sol7.jpg';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { toast } from 'react-toastify';
import './AboutArtists.scss'
import Lightbox from 'react-image-lightbox';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
class AboutArtist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            visible: false,
            isOpen: false,
            previewImgUrl: '',
            isOpenModalUser: false
        }
    }

    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState) {
    }


    handleKeoTha = (e) => {
        var min = e.target.min,
            max = e.target.max,
            val = e.target.value;


        $(e.target).css({
            'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
        });
    }
    test = () => {
        toast.success('hi')
    }
    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let ObjectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: ObjectUrl,
                avatar: file
            })
        }
        //console.log('check file 0: ', ObjectUrl);
    }
    handleOpenImage = () => {

        this.setState({
            isOpen: true
        })
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    render() {
        let visible = this.state.visible;
        let isOpen = this.state.isOpen;
        console.log('check isopen img: ', isOpen);

        let { image, description } = this.props;


        return (
            <>

                <Modal isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}

                    className={'modal-about-container'}
                    style={{
                        marginTop: '200px',

                    }}
                    size='lg'
                >
                    <ModalHeader toggle={() => this.toggle()}
                        className={'modal-header-about'}
                    >
                    </ModalHeader>
                    <ModalBody
                        className={'modal-body-about'}
                        style={{
                            maxHeight: 'calc(100vh - 210px)',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            background: '#121212'
                        }}
                    >
                        <div className='row about-artists'>
                            <div className='img-artists col-4'>
                                <img src={image} />
                            </div>
                            <div className='content-artists col-8'>
                                {description}
                            </div>
                        </div>

                    </ModalBody>

                </Modal>

            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutArtist);
