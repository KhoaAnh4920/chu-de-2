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
import PlayBar from '../Share/PlayBar';
import $ from "jquery";
import sol7 from '../../assets/images/artist/sol7.jpg';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { toast } from 'react-toastify';
import ModelUser from './ModelUser';
import Lightbox from 'react-image-lightbox';
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

    render() {
        let visible = this.state.visible;
        let isOpen = this.state.isOpen;
        console.log('check isopen img: ', isOpen);
        return (
            <>

                <div className='list-music-container'>
                    <div className='title-list' style={{ borderBottom: '1px solid gray' }}>
                        <h4>About</h4>
                    </div>
                    <ModelUser isOpen={this.state.isOpenModalUser}
                        toggleFromParent={this.toggleUserModal} />
                    <div className="about-content" >
                        <div className="about-img">
                            <img src={sol7} style={{ width: '204px', height: '204px' }}
                                onClick={() => this.handleOpenImage()} />
                        </div>
                        <div onClick={() => this.handleAddNewUser()}>
                            <div className="about-titleInfo" >
                                72,702 monthly listeners
                            </div>
                            <div className="about-info">
                                Sol7 tên thật Vương Ngọc Tân, sinh ra và lớn lên tại Bồng Sơn - Hoài Nhơn - Bình Định.
                                Năm 2012 Sol7 cùng TB thành lập DCOD gồm những thành viên Yuno, Dope B, V$oul, từ đó kết nạp thêm nhiều thành viên như P$mall, Mkid, A$er, Lonie, Nbin...và cho đến nay
                            </div>
                        </div>
                    </div>
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={sol7}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>

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
