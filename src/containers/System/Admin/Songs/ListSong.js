import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './ListSong.scss';
import MaterialTable from 'material-table'
import { CommonUtils } from '../../../../utils';
import Swal from 'sweetalert2'
import LoadingOverlay from "react-loading-overlay";
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { getAllSong, deleteSongService } from '../../../../services/SongService'


class ListSong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listArtists: [],
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


    fetchAllSong = async () => {
        let songData = await getAllSong();

        if (songData) {
            let result = songData.map((item, index) => {
                if (item.SongOfArtists) {
                    item.fullName = '';
                    item.SongOfArtists.map(artist => {
                        item.fullName = item.fullName + artist.fullName + ', ';
                    })
                    item.fullName = item.fullName.replace(/,(\s+)?$/, '');
                }
                if (item.GenresSong) {
                    item.genresName = item.GenresSong.genresName;
                }

                item.timePlay = this.fancyTimeFormat(item.timePlay);
                return item;
            })

            this.setState({
                listArtists: result,
                isShowLoading: false
            })
        }
    }

    async componentDidMount() {
        await this.fetchAllSong();
    }

    componentDidUpdate(prevProps, prevState) {
    }

    handleOnDeleteSong = async (id) => {
        try {

            this.setState({
                isShowLoading: true
            })

            let res = await deleteSongService(id);
            if (res && res.errCode === 0) {
                await this.fetchAllSong();
                toast.success("Xóa thành công");
            } else {
                toast.error("Xóa thất bại");
                console.log(res.errMessage)
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
        let { listArtists } = this.state;
        const columns = [
            // { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.avatar} style={{ width: 40, borderRadius: '50%' }} /> },
            { title: 'ID', field: 'id' },
            { title: 'Image', field: 'imageUrl', render: rowData => <img src={rowData.image} style={{ width: 80, height: 80 }} /> },
            { title: 'Tên bài hát', field: 'nameSong' },
            { title: 'Ca sĩ', field: 'fullName' },
            { title: 'Thể loại', field: 'genresName' },
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
                                        data={listArtists}
                                        actions={[
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit Genres',
                                                onClick: (event, rowData) => this.props.history.push(`/admin/edit-songs/${rowData.id}`)
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

                                                        this.handleOnDeleteSong(rowData.id)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListSong));
