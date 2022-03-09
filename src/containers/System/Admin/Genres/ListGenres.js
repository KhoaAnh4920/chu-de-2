import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './ListGenres.scss';
import MaterialTable from 'material-table'
import { CommonUtils } from '../../../../utils';
import Swal from 'sweetalert2'


class ListGenres extends Component {

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
                <div id="wrapper">
                    {/* Sidebar */}

                    <Sidebar />

                    {/* Sidebar */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            {/* TopBar */}
                            <Header />
                            {/* Topbar */}
                            <div class="col-lg-12 mb-4">
                                <MaterialTable
                                    title="Multiple Actions Preview"
                                    columns={[
                                        { title: 'Name', field: 'name' },
                                        { title: 'Surname', field: 'surname' },
                                        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                                        {
                                            title: 'Birth Place',
                                            field: 'birthCity',
                                            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                                        },
                                    ]}
                                    data={[
                                        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                                        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                                    ]}
                                    actions={[
                                        {
                                            icon: 'edit',
                                            tooltip: 'Edit User',
                                            onClick: (event, rowData) => alert("You saved " + rowData.name)
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
                                                    Swal.fire(
                                                        'Deleted!',
                                                        'Your file has been deleted.',
                                                        'success'
                                                    )
                                                }
                                            })
                                        }
                                    ]}
                                    options={{
                                        actionsColumnIndex: -1,
                                    }}
                                />
                            </div>


                        </div>
                        {/* Footer */}
                        <Footer />
                        {/* Footer */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListGenres);
