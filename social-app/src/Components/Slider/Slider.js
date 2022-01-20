import React from "react";
import Slider from "react-slick";
import img1 from './images/1.png';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';


export default function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider {...settings}>
            <div>
                <img src={img1} alt='img' />
            </div>
            <div>
                <img src={img2} alt='img' />
            </div>
            <div>
                <img src={img3} alt='img' />
            </div>
        </Slider>
    );
}