import React, { useEffect } from 'react';

const Pricing = () => {
  // Load FontAwesome CSS dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  // Pricing plans data with benefits-focused approach
  const pricingPlans = [
    {
      id: 1,
      name: "Starter Package",
      isHighlighted: false,
      benefits: [
        {text: "Perfect for small businesses and startups", icon: "fa-bullseye"},
        {text: "Essential features to establish your digital presence", icon: "fa-globe"},
        {text: "User-friendly interface with minimal learning curve", icon: "fa-mouse-pointer"},
        {text: "Quick implementation and deployment", icon: "fa-bolt"},
        {text: "Email support within 24 hours", icon: "fa-envelope"}
      ]
    },
    {
      id: 2,
      name: "Growth",
      isHighlighted: true,
      benefits: [
        {text: "Ideal for expanding businesses with growing needs", icon: "fa-expand-arrows-alt"},
        {text: "Advanced features to scale your operations", icon: "fa-cogs"},
        {text: "Detailed analytics and reporting capabilities", icon: "fa-chart-bar"},
        {text: "Automation tools to improve efficiency", icon: "fa-magic"},
        {text: "Priority support with dedicated account manager", icon: "fa-headset"},
        {text: "Regular system updates and enhancements", icon: "fa-sync"}
      ]
    },
    {
      id: 3,
      name: "Enterprise",
      isHighlighted: false,
      benefits: [
        {text: "Tailored solutions for large organizations", icon: "fa-puzzle-piece"},
        {text: "Custom feature development to match your workflow", icon: "fa-code"},
        {text: "Advanced security and compliance measures", icon: "fa-shield-alt"},
        {text: "Unlimited users with role-based access control", icon: "fa-users-cog"},
        {text: "24/7 premium support with guaranteed response times", icon: "fa-life-ring"},
        {text: "Quarterly strategy sessions with our experts", icon: "fa-handshake"}
      ]
    }
  ];

  return (
    <section className="section" id="price">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="section-title" data-aos="fade-up">
              <div className="mb-4">
                <i className="fas fa-layer-group fa-3x text-primary"></i>
              </div>
              <h4 className="title text-uppercase mb-4">Solutions That Scale With Your Business</h4>
              <p className="text-muted mb-0">We offer flexible packages designed to meet your specific needs at any stage of your business journey.</p>
              <a href="https://calendly.com/reveriontech" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">
                <i className="fas fa-calendar-check mr-2"></i> Book a Free Consultation to Discuss Your Needs
              </a>
            </div>
          </div>
        </div>

        <div className="row align-items-center mt-5" data-aos="fade-up">
          {pricingPlans.map(plan => (
            <div className="col-lg-4 col-md-6 p-lg-0 mt-4 pt-2" key={plan.id}>
              <div className={`pricing-table border rounded ${plan.isHighlighted ? 'business-plan position-relative' : ''} bg-white text-center h-100`}>
                <h6 className={`pricing-plan rounded-top text-uppercase ${plan.isHighlighted ? 'bg-custom text-light' : 'bg-light'} p-3 mb-0`}>
                  {plan.name}
                </h6>
                <div className="pricing-features py-4 px-4">
                  <div className="mb-4 text-center">
                    <i className={`${
                      plan.id === 1 ? "fas fa-rocket" : 
                      plan.id === 2 ? "fas fa-chart-line" : 
                      "fas fa-building"
                    } fa-3x mb-3 ${
                      plan.isHighlighted ? "text-custom" : "text-primary"
                    }`}></i>
                    <p className="text-muted">
                      {plan.id === 1 ? "Essential foundation for new ventures" : 
                      plan.id === 2 ? "Accelerate your business expansion" : 
                      "Enterprise-grade solutions for complex needs"}
                    </p>
                  </div>
                  <ul className="list-unstyled text-left">
                    {plan.benefits.map((benefit, index) => (
                      <li className={index > 0 ? "border-top pt-3 mt-3" : ""} key={index}>
                        <div className="d-flex align-items-start">
                          <div className="icon-container" style={{minWidth: "30px"}}>
                            <i className={`fas ${benefit.icon} ${plan.isHighlighted ? "text-custom" : "text-primary"}`}></i>
                          </div>
                          <span className="ml-2">{benefit.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-2">
                    <a href={`https://calendly.com/reveriontech?package=${plan.name}`} target="_blank" rel="noopener noreferrer" 
                      className={`btn ${plan.isHighlighted ? 'btn-custom' : 'btn-outline-primary'} w-100`}>
                      <i className="fas fa-comments mr-2"></i> Book Us A Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8 text-center">
            <div className="custom-note p-4 bg-light rounded" data-aos="fade-up">
              <h5>Not sure which package is right for you?</h5>
              <p className="mb-3">Our experts can analyze your specific requirements and recommend the best solution for your business.</p>
              <a href="https://calendly.com/reveriontech" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <i className="fas fa-phone-alt mr-2"></i> Schedule a Personalized Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;