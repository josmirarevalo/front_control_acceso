import React from 'react';
import Slider from "react-slick";
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

require('dotenv').config();
export default function Slider(props){

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        width: 550,
        className: 'slides',
        display: 'block'
    };
    
    const getImg = (image) => {       
        if (image) {
            if (image.srcSet) return image.srcSet;
            if (image.src) return image.src;
            if (image.file) return `${process.env.REACT_APP_IMAGES_URL}/${image.file.filename}`;
            return null;
        }
    }
    
    return(
        <div
            style={{
                width: settings.width + "px",
                display: settings.display ? "block" : "none",
                padding: 24
            }}
        >
            <Slider {...settings}>
            {
                props.images.map((image)=>{
                    return (
                        <div key={image.id}>
                            <img
                                src={getImg(image)}
                                width={settings.width}
                                alt=""
                            />
                        </div>
                    );
                })
            }
            </Slider>
        </div>
    )
}