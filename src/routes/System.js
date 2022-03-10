import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from '../containers/System/Admin/Dashboard';
import AddUser from '../containers/System/Admin/Users/AddUser';
import ListUser from '../containers/System/Admin/Users/ListUser';
import AddGenres from '../containers/System/Admin/Genres/AddGenres';
import EditUser from '../containers/System/Admin/Users/EditUser';
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
                            <Route path="/admin/edit-user/:id" component={EditUser} />


                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </CustomScrollbars>
                </div>

                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
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
