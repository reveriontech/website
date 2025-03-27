import React from 'react';

const Pricing = () => {
  // Pricing plans data
  const pricingPlans = [
    {
      id: 1,
      name: "Basic",
      price: "$0",
      isHighlighted: false,
      features: [
        "Full Access",
        "Source Files",
        "100 User Accounts",
        "1 Year License",
        "Phone & Email Support"
      ]
    },
    {
      id: 2,
      name: "Standard",
      price: "$199",
      isHighlighted: true,
      features: [
        "Full Access",
        "Source Files",
        "100 User Accounts",
        "1 Year License",
        "Phone & Email Support",
        "Manual Backup"
      ]
    },
    {
      id: 3,
      name: "Premium",
      price: "$299",
      isHighlighted: false,
      features: [
        "Full Access",
        "Source Files",
        "100 User Accounts",
        "1 Year License",
        "Phone & Email Support"
      ]
    },
    {
      id: 4,
      name: "Professional",
      price: "$499",
      isHighlighted: false,
      features: [
        "Full Access",
        "Source Files",
        "100 User Accounts",
        "1 Year License",
        "Phone & Email Support"
      ]
    }
  ];

  return (
    <section className="section" id="price">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="section-title" data-aos="fade-up">
              <h4 className="title text-uppercase mb-4">Our Pricing</h4>
            </div>
          </div>
        </div>

        <div className="row align-items-center" data-aos="fade-up">
          {pricingPlans.map(plan => (
            <div className="col-lg-3 col-md-6 p-lg-0 mt-4 pt-2" key={plan.id}>
              <div className={`pricing-table border rounded ${plan.isHighlighted ? 'business-plan position-relative' : ''} bg-white text-center`}>
                <h6 className={`pricing-plan rounded-top text-uppercase ${plan.isHighlighted ? 'bg-custom text-light' : 'bg-light'} p-3 mb-0`}>
                  {plan.name}
                </h6>
                <div className="price-value border-bottom py-4">
                  <h3 className="mb-0 font-weight-normal">{plan.price}</h3>
                  <h6 className="text-capitalize font-weight-normal mb-0">Monthly</h6>
                </div>
                <div className="pricing-features py-4 px-5">
                  <ul className="list-unstyled">
                    {plan.features.map((feature, index) => (
                      <li className={index > 0 ? "border-top pt-2 mt-2" : ""} key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href="javascript:void(0)" className={`btn ${plan.isHighlighted ? 'btn-custom' : 'btn-dark'} w-100 mt-2`}>
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;