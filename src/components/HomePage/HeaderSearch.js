import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HeaderSearch.scss';
import { getAllSong, getSongByName } from '../../services/SongService'
import axios from 'axios';
import { reject } from 'lodash';


class HeaderSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameSong: '',
            songResult: ''
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }
    handleInput = async (event) => {
        if (event.key === 'Enter') {
            this.setState({
                nameSong: event.target.value
            })
            event.preventDefault();

            let song = await getSongByName(event.target.value);
            if (song) {
                this.props.getData(song)

            } else {
                console.log('false')
            }
        }

    }


    render() {

        return (
            <>

                <div className="w3-container header w3-dark top-bar">
                    <button className='left-arrow'> <i class='fas fa-chevron-left'></i>  </button >
                    <button className='right-arrow'> <i class='fas fa-chevron-right'></i>  </button>
                    <form><input onKeyDown={(event) => { this.handleInput(event) }} className='input-search' type='text' placeholder='Artists, songs, or podcasts'></input></form>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch);
