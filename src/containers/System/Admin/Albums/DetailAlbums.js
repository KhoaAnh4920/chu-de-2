import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './DetailAlbums.scss';
import MaterialTable from 'material-table'
import { CommonUtils } from '../../../../utils';
import { getAllAlbums, deleteSongInAlbum, createNewSongInAlbum } from '../../../../services/AlbumService'
import * as actions from "../../../../store/actions" // import cả 3 action //
import Swal from 'sweetalert2';
import LoadingOverlay from "react-loading-overlay";
import moment from 'moment';
import { withRouter } from 'react-router';
import ModalAddSong from './ModalAddSong';
import { toast } from 'react-toastify';






class DetailAlbums extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listSongs: [],
            isShowLoading: true,
            isOpenModalUser: false,
        }
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    createNewSong = async (data) => {
        this.setState({
            isShowLoading: true
        })
        if (data && data.selectedSongs) {
            data.albumId = this.state.albumId;

            let response = await createNewSongInAlbum(data);
            if (response && response.errCode !== 0) {
                toast.error("Them that bai")
            } else {
                await this.props.fetchAllAlbums();
                toast.success("Them thanh cong")
                this.setState({
                    isOpenModalUser: false,
                    isShowLoading: false
                })
            }
        }
        this.setState({
            isOpenModalUser: false,
            isShowLoading: false
        })
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

    fetchDetailAlbum = async (listAlbums) => {

        if (listAlbums.length) {
            let detailAlbums = listAlbums.filter(item => item.id === +this.props.match.params.id);
            if (detailAlbums && detailAlbums[0].AlbumForSongs) {

                let result = detailAlbums[0].AlbumForSongs.map(item => {
                    if (!isNaN(item.timePlay)) {
                        item.timePlay = this.fancyTimeFormat(item.timePlay);
                    }
                    return item;
                })


                await this.setState({
                    listSongs: result,
                    isShowLoading: false,
                    albumId: +this.props.match.params.id
                })
            }
        }
    }

    async componentDidMount() {

        let { listAlbums } = this.props;

        await this.fetchDetailAlbum(listAlbums);

    }



    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.listAlbums !== this.props.listAlbums) {

            await this.fetchDetailAlbum(this.props.listAlbums);
        }
    }

    handleOnDeleteSongInAlbums = async (songid) => {
        let { listAlbums } = this.props;
        try {
            this.setState({
                isShowLoading: true
            })

            let res = await deleteSongInAlbum(this.state.albumId, songid);
            if (res && res.errCode === 0) {
                toast.success("Xóa thành công");
                await this.props.fetchAllAlbums();
            } else {
                toast.error("Xóa thất bại");
                alert(res.errMessage)
            }
            this.setState({
                isShowLoading: false
            })
        } catch (e) {
            toast.error("Xóa thất bại");
            console.log(e);
        }
    }



    render() {

        let { listSongs } = this.state;
        let { listAlbums } = this.props;



        const columns = [
            // { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.avatar} style={{ width: 40, borderRadius: '50%' }} /> },
            { title: 'ID', field: 'id' },
            { title: 'Image', field: 'imageUrl', render: rowData => <img src={rowData.image} style={{ width: 80, height: 80 }} /> },
            { title: 'Tên bài hát', field: 'nameSong' },
            { title: 'Thời lượng', field: 'timePlay' },
            { title: 'Lượt nghe', field: 'countListen' },
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
                                        title="Danh sách bài hát"
                                        columns={columns}
                                        data={listSongs}
                                        actions={[
                                            {
                                                icon: "add_box",
                                                tooltip: "Add Song",
                                                isFreeAction: true,
                                                onClick: () => {
                                                    this.setState({
                                                        isOpenModalUser: true
                                                    })
                                                }
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
                                                        this.handleOnDeleteSongInAlbums(rowData.id)
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

                    {this.state.isOpenModalUser &&
                        <ModalAddSong
                            isOpen={this.state.isOpenModalUser}
                            toggleFromParent={this.toggleUserModal}
                            listAlbums={listAlbums}
                            createNewSong={this.createNewSong}
                            type="Albums"
                            albumId={this.state.albumId}
                        />
                    }


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailAlbums));
