import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';



class Footer extends Component {

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
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>copyright ©  - developed by
                                <b><a href="https://indrijunanda.gitlab.io/" target="_blank">indrijunanda</a></b>
                            </span>
                        </div>
                    </div>
                    <div className="container my-auto py-2">
                        <div className="copyright text-center my-auto">
                            <span>copyright ©  - distributed by
                                <b><a href="https://themewagon.com/" target="_blank">themewagon</a></b>
                            </span>
                        </div>
                    </div>
                </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
