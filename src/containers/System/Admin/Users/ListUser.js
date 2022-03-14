import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './ListUser.scss';
import MaterialTable from 'material-table'
import { CommonUtils } from '../../../../utils';
import { getAllUser, deleteUserService } from '../../../../services/UserService'
import Swal from 'sweetalert2';
import LoadingOverlay from "react-loading-overlay";
import moment from 'moment';
import { withRouter } from 'react-router';


class ListUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listUser: [],
            isShowLoading: true
        }
    }

    fetchAllUser = async () => {
        let userData = await getAllUser();

        if (userData && userData.user) {
            let result = userData.user.map((item, index) => {
                if (item.UserRoles)
                    item.rolesName = item.UserRoles.rolesName;
                item.birthday = moment(item.birthday).format("DD/MM/YYYY");
                return item;
            })

            this.setState({
                listUser: result,
                isShowLoading: false
            })
        }
    }

    async componentDidMount() {

        await this.fetchAllUser();
    }

    componentDidUpdate(prevProps, prevState) {
    }

    handleOnDeleteUser = async (id) => {
        try {
            this.setState({
                isShowLoading: true
            })

            let res = await deleteUserService(id);
            if (res && res.errCode === 0) {
                await this.fetchAllUser();
            } else {
                alert(res.errMessage)
            }
            this.setState({
                isShowLoading: false
            })
        } catch (e) {
            console.log(e);
        }
    }



    render() {

        let { listUser } = this.state;

        const columns = [
            // { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.avatar} style={{ width: 40, borderRadius: '50%' }} /> },
            { title: 'ID', field: 'id' },
            { title: 'Avatar', field: 'avatar', render: rowData => <img src={rowData.avatar} style={{ width: 80, height: 80, borderRadius: '50%' }} /> },
            { title: 'Email', field: 'email' },
            { title: 'Username', field: 'userName' },
            { title: 'FullName', field: 'fullName' },
            { title: 'Birthday', field: 'birthday' },
            { title: 'Gender', field: 'gender', render: rowData => (rowData.gender) ? 'Nam' : 'Nữ' },
            { title: 'Role', field: 'rolesName' },
            { title: 'Status', field: 'isActive', render: rowData => (rowData.isActive) ? <span className="badge badge-success">Active</span> : <span className="badge badge-danger">InActive</span> },

        ]

        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Vui lòng chờ trong giây lát...'
                >
                    <div id="wrapper">
                        {/* Sidebar */}

                        <Sidebar />

                        {/* Sidebar */}
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                {/* TopBar */}
                                <Header />
                                {/* Topbar */}
                                <div className="col-lg-12 mb-4">
                                    <MaterialTable
                                        title="Danh sách người dùng"
                                        columns={columns}
                                        data={listUser}
                                        actions={[
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit User',
                                                onClick: (event, rowData) => this.props.history.push(`/admin/edit-user/${rowData.id}`)
                                            },
                                            {
                                                icon: 'delete',
                                                tooltip: 'Delete User',
                                                onClick: (event, rowData) => Swal.fire({
                                                    title: 'Are you sure?',
                                                    text: "You won't be able to revert this!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Yes, delete it!'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        this.handleOnDeleteUser(rowData.id)
                                                    }
                                                })
                                            }
                                        ]}
                                        options={{
                                            actionsColumnIndex: -1,
                                            headerStyle: { color: "#6e707e", backgroundColor: "#eaecf4", fontSize: '15px', fontWeight: 700 },
                                            paginationType: "stepped"

                                        }}
                                    />
                                </div>


                            </div>
                            {/* Footer */}
                            <Footer />
                            {/* Footer */}
                        </div>
                    </div>
                </LoadingOverlay>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListUser));
