import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Header.scss';


class DefaultClass extends Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
