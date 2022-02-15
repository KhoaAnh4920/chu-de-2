import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Navigator from '../../../components/Navigator';
import { adminMenu } from '../../../containers/Header/menuApp';


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
                <Navigator menus={adminMenu} />

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
