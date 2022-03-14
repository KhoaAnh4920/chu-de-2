import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './ListAlbum.scss';
import MaterialTable from 'material-table'
import { CommonUtils } from '../../../../utils';
import { deleteAlbumsService } from '../../../../services/AlbumService'
import * as actions from "../../../../store/actions" // import cả 3 action //
import Swal from 'sweetalert2';
import LoadingOverlay from "react-loading-overlay";
import moment from 'moment';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';


class ListAlbum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listAlbums: [],
            isShowLoading: true

        }
    }

    fancyTimeFormat = (duration) => {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    async componentDidMount() {

        await this.props.fetchAllAlbums();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listAlbums !== this.props.listAlbums) {
            console.log(this.props.listAlbums);
            let listAlbums = this.props.listAlbums;

            if (listAlbums) {

                let result = listAlbums.map(item => {
                    if (item.AlbumForSongs)
                        item.countSongs = Object.keys(item.AlbumForSongs).length;
                    if (item.AlbumGenre)
                        item.genresName = item.AlbumGenre.genresName;
                    if (item.AlbumOfArtists)
                        item.fullName = item.AlbumOfArtists[0].fullName;
                    item.createdAt = moment(item.createdAt).fromNow();
                    item.albumTimeLength = this.fancyTimeFormat(item.albumTimeLength);
                    return item;
                })

                this.setState({
                    listAlbums: result,
                    isShowLoading: false
                })
            }
        }
    }

    handleOnDeleteAlbums = async (id) => {
        try {
            this.setState({
                isShowLoading: true
            })

            let res = await deleteAlbumsService(id);
            if (res && res.errCode === 0) {
                await this.props.fetchAllAlbums();
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

        let { listAlbums } = this.state;



        const columns = [
            // { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.avatar} style={{ width: 40, borderRadius: '50%' }} /> },
            { title: 'ID', field: 'id' },
            { title: 'Hình ảnh', field: 'image', render: rowData => <img src={rowData.image} style={{ width: 80, height: 80 }} /> },
            { title: 'Tên Album', field: 'albumName', render: rowData => <Link to={`/admin/detail-album/${rowData.id}`}>{rowData.albumName}</Link> },
            { title: 'Ca sĩ', field: 'fullName' },
            { title: 'Thể loại', field: 'genresName' },
            { title: 'Thời lượng', field: 'albumTimeLength' },
            { title: 'Số lượng bài hát', field: 'countSongs' },
            { title: 'Lượt nghe', field: 'countListen' },
            { title: 'Thời gian tạo', field: 'createdAt' },
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
                                        title="Danh sách Albums"
                                        columns={columns}
                                        data={listAlbums}
                                        actions={[
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit Album',
                                                onClick: (event, rowData) => this.props.history.push(`/admin/edit-album/${rowData.id}`)
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
                                                        this.handleOnDeleteAlbums(rowData.id)
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
        listAlbums: state.admin.listAlbums
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllAlbums: () => dispatch(actions.fetchAllAlbums()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAlbum));
