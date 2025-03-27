import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    comments: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    message: '',
    isSuccess: false,
    isSubmitting: false
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, isSubmitting: true });
    
    // Form validation
    if (!formData.name || !formData.email || !formData.comments) {
      setFormStatus({
        message: 'Please fill all required fields.',
        isSuccess: false,
        isSubmitting: false
      });
      return;
    }
    
    try {
      // Replace with your actual form submission logic
      // For now, just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus({
        message: 'Thank you! Your message has been sent successfully.',
        isSuccess: true,
        isSubmitting: false
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        comments: ''
      });
    } catch (error) {
      setFormStatus({
        message: 'Oops! Something went wrong. Please try again later.',
        isSuccess: false,
        isSubmitting: false
      });
    }
  };
  
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="section-title" data-aos="fade-up">
              <h4 className="title text-uppercase mb-4">Contact Us</h4>
              <p className="text-muted mx-auto para-desc mb-0">Shaping the future of decentralized technology</p>
            </div>
          </div>
        </div>

        <div className="row" data-aos="fade-up">
          <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div className="row align-items-center">
              <div className="col-4">
                <div className="contact-detail">
                  <i className="mdi mdi-phone text-white shadow bg-custom rounded-pill d-inline-block text-center"></i>
                </div>
              </div>

              <div className="col-8">
                <div className="contact-detail">
                  <div className="content d-block overflow-hidden">
                    <h4 className="title mb-0">Call Me</h4>
                    <p className="text-muted mb-0">+915 5864 548</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div className="row align-items-center">
              <div className="col-4">
                <div className="contact-detail">
                  <i className="mdi mdi-crosshairs-gps text-white shadow bg-custom rounded-pill d-inline-block text-center"></i>
                </div>
              </div>

              <div className="col-8">
                <div className="contact-detail">
                  <div className="content d-block overflow-hidden">
                    <h4 className="title mb-0">Office</h4>
                    <p className="text-muted mb-0">Lot3, block14, Phase 9a, Executive Phase,<br/> Deca Homes, Tacunan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div className="row align-items-center">
              <div className="col-4">
                <div className="contact-detail">
                  <i className="mdi mdi-email text-white shadow bg-custom rounded-pill d-inline-block text-center"></i>
                </div>
              </div>

              <div className="col-8">
                <div className="contact-detail">
                  <div className="content d-block overflow-hidden">
                    <h4 className="title mb-0">Send Me</h4>
                    <p className="text-muted mb-0">yourname@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4 pt-2">
          <div className="col-lg-12">
            <div className="custom-form mb-sm-30" data-aos="fade-up">
              {formStatus.message && (
                <div className={`alert ${formStatus.isSuccess ? 'alert-success' : 'alert-danger'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="form-group position-relative mb-4">
                      <label htmlFor="name">Your Name <span className="text-danger">*</span> :</label>
                      <input 
                        name="name" 
                        id="name" 
                        type="text" 
                        className="form-control" 
                        placeholder="Your Name :" 
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="col-lg-4 col-md-6">
                    <div className="form-group position-relative mb-4">
                      <label htmlFor="email">Your Email <span className="text-danger">*</span> :</label>
                      <input 
                        name="email" 
                        id="email" 
                        type="email" 
                        className="form-control" 
                        placeholder="Your email :" 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div> 
                  </div>
                  
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group position-relative mb-4">
                      <label htmlFor="subject">Subject :</label>
                      <input 
                        name="subject" 
                        id="subject" 
                        className="form-control" 
                        placeholder="Your subject :" 
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>                                                                               
                  </div>
                  
                  <div className="col-md-12">
                    <div className="form-group position-relative mb-4">
                      <label htmlFor="comments">Your Message <span className="text-danger">*</span> :</label>
                      <textarea 
                        name="comments" 
                        id="comments" 
                        rows="4" 
                        className="form-control" 
                        placeholder="Your Message :" 
                        value={formData.comments}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <button 
                      type="submit" 
                      className="submitBnt btn btn-custom w-100" 
                      disabled={formStatus.isSubmitting}
                    >
                      {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;