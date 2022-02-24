import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import logoFrontEnd from '../../assets/images/logo2.png';
import './Sidebar.scss';


class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }


    render() {
        return (
            <>
                <div className="side">
                    <div className="side__wrap side__nav">
                        <div className="logo">
                            <img src={logoFrontEnd} />
                        </div>
                        <ul className="nav">
                            <li className="nav__list">
                                <i className="nav__icon fas fa-home" />
                                <p className="nav__text">Home</p>
                            </li>
                            <li className="nav__list">
                                <i className="nav__icon far fa-compass" />
                                <p className="nav__text">Search</p>
                            </li>
                            <li className="nav__list">
                                <i className="nav__icon fas fa-broadcast-tower" />
                                <p className="nav__text">Your Library</p>
                            </li>



                            <li className="nav__list" style={{ marginTop: '20px' }}>
                                <i className="nav__icon fas fa-broadcast-tower" />
                                <p className="nav__text">Create Playlist</p>
                            </li>
                            <li className="nav__list">
                                <i className="nav__icon fas fa-broadcast-tower" />
                                <p className="nav__text">Liked Songs</p>
                            </li>

                        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
