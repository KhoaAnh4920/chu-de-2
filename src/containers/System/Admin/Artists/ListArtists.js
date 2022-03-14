import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './ListArtists.scss';
import MaterialTable from 'material-table'
import { CommonUtils } from '../../../../utils';
import { getAllArtists, deleteArtistsService } from '../../../../services/ArtistsService'
import Swal from 'sweetalert2';
import LoadingOverlay from "react-loading-overlay";
import moment from 'moment';
import { withRouter } from 'react-router';


class ListArtists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listArtists: [],
            isShowLoading: true

        }
    }

    fetchAllArtists = async () => {
        let artistsData = await getAllArtists();

        if (artistsData && artistsData.artists) {
            let result = artistsData.artists.map((item, index) => {
                if (item.ArtistsCountry)
                    item.nameCountry = item.ArtistsCountry.nameCountry;
                return item;
            })

            this.setState({
                listArtists: result,
                isShowLoading: false
            })
        }
    }

    async componentDidMount() {

        await this.fetchAllArtists();
    }

    componentDidUpdate(prevProps, prevState) {
    }

    handleOnDeleteArtists = async (id) => {
        try {
            this.setState({
                isShowLoading: true
            })

            let res = await deleteArtistsService(id);
            if (res && res.errCode === 0) {
                await this.fetchAllArtists();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Xóa không thành công',
                    text: res.errMessage,
                })
            }
            this.setState({
                isShowLoading: false
            })
        } catch (e) {
            console.log(e);
        }
    }



    render() {

        let { listArtists } = this.state;

        const columns = [

            // { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.avatar} style={{ width: 40, borderRadius: '50%' }} /> },
            { title: 'ID', field: 'id' },
            { title: 'Hình ảnh', field: 'image', render: rowData => <img src={rowData.image} style={{ width: 80, height: 80, borderRadius: '50%' }} /> },
            { title: 'FullName', field: 'fullName' },
            { title: 'Gender', field: 'gender', render: rowData => (rowData.gender) ? 'Nam' : 'Nữ' },
            { title: 'Country', field: 'nameCountry' },

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
                                        title="Danh sách nghệ sĩ"
                                        columns={columns}
                                        data={listArtists}
                                        actions={[
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit Artists',
                                                onClick: (event, rowData) => this.props.history.push(`/admin/edit-artists/${rowData.id}`)
                                            },
                                            {
                                                icon: 'delete',
                                                tooltip: 'Delete Artists',
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
                                                        this.handleOnDeleteArtists(rowData.id)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListArtists));
