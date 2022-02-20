import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

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
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };
        return (
            <>
                <div className="bg">
                    <div class="w3-sidebar w3-dark-black w3-bar-block" style={{ width: "15%" }}>
                        <div className="logo">

                        </div>
                        <a href="#" class="w3-bar-item w3-button"><i className="fa fa-home"></i>  Home</a>
                        <a href="#" class="w3-bar-item w3-button"><i className="fa fa-search"></i>  Search</a>
                        <a href="#" class="w3-bar-item w3-button"><i className="fa fa-file"></i>  Libary</a>
                        <a href="#" class="w3-bar-item w3-button py-4"></a>
                        <a href="#" class="w3-bar-item w3-button"><i class="fa fa-list"></i>  Create your list</a>
                        <a href="#" class="w3-bar-item w3-button"><i class="fa fa-heart"></i>  Like song</a>
                    </div>


                    <div className='' style={{ marginLeft: "15%" }}>

                        <div class="w3-container header w3-dark " style={{ padding: "10px" }}>
                            <button style={{ outline: "none", color: "white", border: "none", backgroundColor: "transparent", fontSize: "25px" }}> &lt;  </button > <button style={{ outline: "none", color: "white", border: "none", backgroundColor: "transparent", fontSize: "25px" }}> &gt;  </button>
                            <div style={{ float: "right" }}>
                                <button style={{ outline: "none", borderRadius: "10px", marginRight: "6px", color: "white", backgroundColor: "transparent", fontSize: "18px" }}>
                                    Sign in
                                </button>
                                <button style={{ outline: "none", borderRadius: "10px", backgroundColor: "white", color: "black", fontSize: "18px" }}>Sign up</button>
                            </div>
                        </div>
                        <div className="">
                            <div class="w3-container">
                                <h2>Nhạc của Khoa</h2>
                                <Slider {...settings}>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 1</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 2</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 3</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 4</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 5</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 6</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 7</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 8</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 9</div>
                                    </div>
                                </Slider>
                                <h2>Chill</h2>
                                <Slider {...settings}>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 1</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 2</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 3</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 4</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 5</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 6</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 7</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 8</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 9</div>
                                    </div>
                                </Slider>
                                <h2>Chill</h2>
                                <Slider {...settings}>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 1</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 2</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 3</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 4</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 5</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 6</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 7</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 8</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 9</div>
                                    </div>
                                </Slider>
                                <h2>Chill</h2>
                                <Slider {...settings}>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 1</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 2</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 3</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 4</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 5</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 6</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 7</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 8</div>
                                    </div>
                                    <div className="specialty-customize">
                                        <div className="bg-img" />
                                        <div>chuyên khoa 9</div>
                                    </div>
                                </Slider>
                            </div>
                        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
