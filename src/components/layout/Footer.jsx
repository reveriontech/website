import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <footer className="footer py-5 bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <Link className="footer-logo" to="/">ReverionTech</Link>
              <p className="text-foot mt-3">Shaping the future of decentralized technology</p>
              <ul className="list-unstyled social-icon social mb-0 mt-4">
                <li className="list-inline-item"><a href="#"><i className="mdi mdi-facebook" title="Facebook"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="mdi mdi-linkedin" title="Linkedin"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="mdi mdi-youtube" title="Youtube"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="mdi mdi-instagram" title="Instagram"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="mdi mdi-twitter" title="Twitter"></i></a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 mt-4 pt-2 mt-lg-0 pt-lg-0">
              <h4 className="text-light text-uppercase footer-head">Links</h4>
              <ul className="list-unstyled footer-list mt-4 mb-0">
                <li><a href="#" className="text-foot"><i className="mdi mdi-chevron-right mr-2"></i> Aboutus</a></li>
                <li className="mt-2"><a href="#" className="text-foot"><i className="mdi mdi-chevron-right mr-2"></i> Services</a></li>
                <li className="mt-2"><a href="#" className="text-foot"><i className="mdi mdi-chevron-right mr-2"></i> Team</a></li>
                <li className="mt-2"><a href="#" className="text-foot"><i className="mdi mdi-chevron-right mr-2"></i> Pricing</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-5 mt-4 pt-2 mt-lg-0 pt-lg-0">
              <h4 className="text-light text-uppercase footer-head">Tags</h4>
              <div className="tagcloud mt-4">
                <a href="#">Agency</a>
                <a href="#">Responsive</a>
                <a href="#">Slider</a>
                <a href="#">Services</a>
                <a href="#">Price</a>
                <a href="#">News</a>
                <a href="#">Hero</a>
                <a href="#">Reviews</a>
                <a href="#">CTA</a>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 mt-4 pt-2 mt-lg-0 pt-lg-0">
              <h4 className="text-light text-uppercase footer-head">Business Hours</h4>
              <ul className="list-unstyled text-foot mt-4 mb-0">
                <li>Monday - Friday : 9:00 to 17:00</li>
                <li className="mt-2">Saturday : 10:00 to 15:00</li>
                <li className="mt-2">Sunday : Day Off (Holiday)</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      <footer className="footer py-4 footer-bar bg-dark">
        <div className="container text-foot text-center">
          <div className="row align-items-center">
            <div className="col-sm-8">
              <div className="text-sm-left">
                <p className="mb-0">{currentYear} © <span className="words-color">ReverionTech</span>. Shaping the future of decentralized technology.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;