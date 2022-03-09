import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from '../containers/System/Admin/Dashboard';
import AddUser from '../containers/System/Admin/Users/AddUser';
import ListUser from '../containers/System/Admin/Users/ListUser';
import AddGenres from '../containers/System/Admin/Genres/AddGenres';
import ListGenres from '../containers/System/Admin/Genres/ListGenres';
import CustomScrollbars from '../components/CustomScrollbars';


// Route của admin //
class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                        <Switch>
                            <Route path="/admin/dashboard" component={Dashboard} />
                            <Route path="/admin/add-users" component={AddUser} />
                            <Route path="/admin/list-users" component={ListUser} />
                            <Route path="/admin/add-genres" component={AddGenres} />
                            <Route path="/admin/list-genres" component={ListGenres} />

                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </CustomScrollbars>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
