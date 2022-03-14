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
import LoadingOverlay from "react-loading-overlay";
import { withRouter } from 'react-router';
import { getAllGenres, deleteGenresService } from '../../../../services/GenresService'


class ListGenres extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listGenres: [],
            isShowLoading: true
        }
    }

    fetchAllGenres = async () => {
        let genresData = await getAllGenres();

        if (genresData && genresData.genres) {
            this.setState({
                listGenres: genresData.genres,
                isShowLoading: false
            })
        }


    }

    async componentDidMount() {
        await this.fetchAllGenres();
    }

    componentDidUpdate(prevProps, prevState) {
    }

    handleOnDeleteGenres = async (id) => {
        try {
            this.setState({
                isShowLoading: true
            })

            let res = await deleteGenresService(id);
            if (res && res.errCode === 0) {
                await this.fetchAllGenres();
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
        let { listGenres } = this.state;
        const columns = [
            // { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.avatar} style={{ width: 40, borderRadius: '50%' }} /> },
            { title: 'ID', field: 'id' },
            { title: 'Thể loại', field: 'genresName' },
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
                                        title="Multiple Actions Preview"
                                        columns={columns}
                                        data={listGenres}
                                        actions={[
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit Genres',
                                                onClick: (event, rowData) => this.props.history.push(`/admin/edit-genres/${rowData.id}`)
                                            },
                                            {
                                                icon: 'delete',
                                                tooltip: 'Delete Genres',
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
                                                        this.handleOnDeleteGenres(rowData.id)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListGenres));
