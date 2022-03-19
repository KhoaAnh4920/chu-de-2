import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.scss';
import './Playlist.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import $ from "jquery";
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { withRouter } from 'react-router';

class FanAlsoLike extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            visible: false,
            listArtists: []
        }
    }

    componentDidMount() {
        if (this.props.listArtists) {
            this.setState({
                listArtists: this.props.listArtists
            })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listArtists !== this.props.listArtists) {
            this.setState({
                listArtists: this.props.listArtists
            })
        }
    }


    handleKeoTha = (e) => {
        var min = e.target.min,
            max = e.target.max,
            val = e.target.value;


        $(e.target).css({
            'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
        });
    }

    handleDetailArtists = (id) => {
        this.props.history.push(`/detail-artists/${id}`)
    }


    render() {
        let visible = this.state.visible;

        let { listArtists } = this.state;



        return (
            <>
                <div className='list-music-container'>
                    <div className='title-list'>
                        <h4>Nghệ sĩ nổi bật</h4>
                        <NavLink activeClassName="active1" to="/all/artist" exact>SEE ALL</NavLink>
                    </div>
                    <div className='list-item row'>
                        {listArtists.map((item, index) => {
                            if (index < 6) {
                                return (
                                    <div className='cart-music col-2' key={index} onClick={() => this.handleDetailArtists(item.id)}  >
                                        <div className='artist-img'>
                                            <img src={item.image} />
                                            <div className='button-play'
                                            ><i class='fas fa-play'></i> </div>
                                        </div>
                                        <div className='music-name'>{item.fullName}</div>
                                        <div className='music-description'>Nghệ sĩ</div>
                                    </div>
                                )
                            }

                        })}


                    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FanAlsoLike));
