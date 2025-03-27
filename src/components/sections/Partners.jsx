import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'slick-carousel';

const Partners = () => {
  const sliderRef = useRef(null);
  
  useEffect(() => {
    // Initialize slick slider
    $(sliderRef.current).slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
    
    // Clean up
    return () => {
      if ($(sliderRef.current).slick) {
        $(sliderRef.current).slick('unslick');
      }
    };
  }, []);
  
  return (
    <section className="section-two bg-light">
      <div className="container">
        <div className="row" data-aos="fade-up">
          <div className="col-12">
            <div className="slider autoplay" ref={sliderRef}>
              <div><img src="/images/partnerlogo/dct.png" className="img-fluid mx-auto d-block logoSize" alt="partners" /></div>
              <div><img src="/images/partnerlogo/icp-ph.png" className="img-fluid mx-auto d-block logoSize" alt="partners" /></div>
              <div><img src="/images/partnerlogo/nftdavao.png" className="img-fluid mx-auto d-block logoSize" alt="partners" /></div>
              <div><img src="/images/partnerlogo/rerdao.png" className="img-fluid mx-auto d-block logoSize" alt="partners" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;