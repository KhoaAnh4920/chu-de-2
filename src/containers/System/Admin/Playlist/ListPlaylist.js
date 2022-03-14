import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './ListPlaylist.scss';
import MaterialTable from 'material-table'
import { CommonUtils } from '../../../../utils';
import { deletePlaylistService } from '../../../../services/PlaylistService'
import * as actions from "../../../../store/actions" // import cả 3 action //
import Swal from 'sweetalert2';
import LoadingOverlay from "react-loading-overlay";
import moment from 'moment';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';


class ListPlaylist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listPlaylist: [],
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

        await this.props.fetchAllPlaylist();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listPlaylist !== this.props.listPlaylist) {
            console.log(this.props.listPlaylist);
            let listPlaylist = this.props.listPlaylist;

            if (listPlaylist) {

                let result = listPlaylist.map(item => {
                    if (item.SongInPlaylist)
                        item.countSongs = Object.keys(item.SongInPlaylist).length;
                    if (item.PlaylistGenre)
                        item.genresName = item.PlaylistGenre.genresName;
                    else
                        item.genresName = 'Nhiều thể loại'
                    item.createdAt = moment(item.createdAt).fromNow();
                    item.playlistTimeLength = this.fancyTimeFormat(item.playlistTimeLength);
                    return item;
                })

                this.setState({
                    listPlaylist: result,
                    isShowLoading: false
                })
            }
        }
    }

    handleOnDeletePlaylist = async (id) => {
        try {
            this.setState({
                isShowLoading: true
            })

            let res = await deletePlaylistService(id);
            if (res && res.errCode === 0) {
                await this.props.fetchAllPlaylist();
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

        let { listPlaylist } = this.state;

        const columns = [
            // { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.avatar} style={{ width: 40, borderRadius: '50%' }} /> },
            { title: 'ID', field: 'id' },
            { title: 'Hình ảnh', field: 'image', render: rowData => <img src={rowData.image} style={{ width: 80, height: 80 }} /> },
            { title: 'Tên Album', field: 'playlistName', render: rowData => <Link to={`/admin/detail-playlist/${rowData.id}`}>{rowData.playlistName}</Link> },
            { title: 'Thể loại', field: 'genresName' },
            { title: 'Thời lượng', field: 'playlistTimeLength' },
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
                                        title="Danh sách Playlists"
                                        columns={columns}
                                        data={listPlaylist}
                                        actions={[
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit playlist',
                                                onClick: (event, rowData) => this.props.history.push(`/admin/edit-playlist/${rowData.id}`)
                                            },
                                            {
                                                icon: 'delete',
                                                tooltip: 'Delete Playlist',
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
                                                        this.handleOnDeletePlaylist(rowData.id)
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
        listPlaylist: state.admin.listPlaylist
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPlaylist: () => dispatch(actions.fetchAllPlaylist()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPlaylist));
