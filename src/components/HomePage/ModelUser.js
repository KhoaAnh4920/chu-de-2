import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './HomePage.scss';
import sol7 from '../../assets/images/artist/sol7.jpg';



class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }


    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent()
    }





    render() {
        console.log('check props: ', this.props);
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'modal-user-container'}
                size={'lg'} data-backdrop="false"
            >
                <ModalHeader toggle={() => { this.toggle() }} >
                    About Sol 7
                </ModalHeader>
                <ModalBody >
                    <div>
                        <div className="about-titleInfo" >
                            72,702 monthly listeners
                        </div>
                        <div className="about-info" style={{ color: 'white' }}>
                            Sol7 tên thật Vương Ngọc Tân, sinh ra và lớn lên tại Bồng Sơn - Hoài Nhơn - Bình Định.
                            Năm 2012 Sol7 cùng TB thành lập DCOD gồm những thành viên Yuno, Dope B, V$oul, từ đó kết nạp thêm nhiều thành viên như P$mall, Mkid, A$er, Lonie, Nbin...và cho đến nay
                        </div>
                        <div className="about-img">
                            <img src={sol7} style={{ width: '204px', height: '204px' }}
                                onClick={() => this.handleOpenImage()} />
                        </div>

                    </div>
                </ModalBody>

            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
