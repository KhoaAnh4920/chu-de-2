import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HeaderSearch.scss';


class HeaderLibary extends Component {

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
                <div className="w3-container header w3-dark top-bar">
                    <button className='left-arrow'> <i class='fas fa-chevron-left'></i>  </button >
                    <button className='right-arrow'> <i class='fas fa-chevron-right'></i>  </button>
                    <span className="nav-libary">
                        <ul class="nav justify-content-center">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Playlists</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Podcarts</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Artists</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href='#'>Albums</a>
                            </li>
                        </ul>
                    </span>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <div className='login-container'>
                        <button className='btn-signUp' type='button'>
                            SIGN UP
                        </button>
                        <button className='btn-login' type='button'>LOG IN</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLibary);
