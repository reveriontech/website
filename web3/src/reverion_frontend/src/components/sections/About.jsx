import React, { useState } from 'react';
import { FaCloud, FaLaptop, FaShoppingCart, FaLightbulb, FaRecycle, FaClock } from 'react-icons/fa';

const About = () => {
  const [activeTab, setActiveTab] = useState('pills-cloud');
  
  const handleTabClick = (tabId, e) => {
    e.preventDefault();
    setActiveTab(tabId);
  };
  
  return (
    <section className="section" id='about'>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="section-title" data-aos="fade-up">
              <h4 className="title text-uppercase mb-4">ReverionTech Capabilities</h4>
              <p className="text-muted mx-auto para-desc mb-0">
                Reverion Tech is transforming the digital world with next-generation Web3, 
                AI, and DevOps solutions. Leverage the power of decentralization, intelligent
                automation, and seamless scalability to build secure, future-proof technology 
                that drives your success.
              </p>
            </div>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col-12">
            <ul className="nav nav-pills nav-justified" id="pills-tab" role="tablist" data-aos="fade-up">
              <li className="nav-item mb-4 pt-2" style={{ padding: '0 10px' }}>
                <a 
                  className={`nav-link ${activeTab === 'pills-cloud' ? 'active' : ''}`}
                  onClick={(e) => handleTabClick('pills-cloud', e)}
                  href="#pills-cloud"
                  role="tab"
                  aria-controls="pills-cloud"
                  aria-selected={activeTab === 'pills-cloud'}
                >
                  <div className="capabilities text-center rounded pt-2 pb-2">
                    <div className="icon bg-custom mb-3">
                      <FaCloud className="text-white" size={24} />
                    </div>
                    <h4 className="title font-weight-normal mb-0">Marketing <br /> Cloud</h4>
                  </div>
                </a>
              </li>
              
              <li className="nav-item mb-4 pt-2" style={{ padding: '0 10px' }}>
                <a 
                  className={`nav-link ${activeTab === 'pills-smart' ? 'active' : ''}`}
                  onClick={(e) => handleTabClick('pills-smart', e)}
                  href="#pills-smart"
                  role="tab"
                  aria-controls="pills-smart"
                  aria-selected={activeTab === 'pills-smart'}
                >
                  <div className="capabilities text-center rounded pt-2 pb-2">
                    <div className="icon bg-custom mb-3">
                      <FaLaptop className="text-white" size={24} />
                    </div>
                    <h4 className="title font-weight-normal mb-0">Smartest <br /> CRM</h4>
                  </div>
                </a>
              </li>
              
              <li className="nav-item mb-4 pt-2" style={{ padding: '0 10px' }}>
                <a 
                  className={`nav-link ${activeTab === 'pills-apps' ? 'active' : ''}`}
                  onClick={(e) => handleTabClick('pills-apps', e)}
                  href="#pills-apps"
                  role="tab"
                  aria-controls="pills-apps"
                  aria-selected={activeTab === 'pills-apps'}
                >
                  <div className="capabilities text-center rounded pt-2 pb-2">
                    <div className="icon bg-custom mb-3">
                      <FaShoppingCart className="text-white" size={24} />
                    </div>
                    <h4 className="title font-weight-normal mb-0">Commerce <br /> Apps</h4>
                  </div>
                </a>
              </li>

              <li className="nav-item mb-4 pt-2" style={{ padding: '0 10px' }}>
                <a 
                  className={`nav-link ${activeTab === 'pills-intelligence' ? 'active' : ''}`}
                  onClick={(e) => handleTabClick('pills-intelligence', e)}
                  href="#pills-intelligence"
                  role="tab"
                  aria-controls="pills-intelligence"
                  aria-selected={activeTab === 'pills-intelligence'}
                >
                  <div className="capabilities text-center rounded pt-2 pb-2">
                    <div className="icon bg-custom mb-3">
                      <FaLightbulb className="text-white" size={24} />
                    </div>
                    <h4 className="title font-weight-normal mb-0">Business <br /> Intelligence</h4>
                  </div>
                </a>
              </li>

              <li className="nav-item mb-4 pt-2" style={{ padding: '0 10px' }}>
                <a 
                  className={`nav-link ${activeTab === 'pills-automation' ? 'active' : ''}`}
                  onClick={(e) => handleTabClick('pills-automation', e)}
                  href="#pills-automation"
                  role="tab"
                  aria-controls="pills-automation"
                  aria-selected={activeTab === 'pills-automation'}
                >
                  <div className="capabilities text-center rounded pt-2 pb-2">
                    <div className="icon bg-custom mb-3">
                      <FaRecycle className="text-white" size={24} />
                    </div>
                    <h4 className="title font-weight-normal mb-0">Automation <br /> Engine</h4>
                  </div>
                </a>
              </li>

              <li className="nav-item mb-4 pt-2" style={{ padding: '0 10px' }}>
                <a 
                  className={`nav-link ${activeTab === 'pills-time' ? 'active' : ''}`}
                  onClick={(e) => handleTabClick('pills-time', e)}
                  href="#pills-time"
                  role="tab"
                  aria-controls="pills-time"
                  aria-selected={activeTab === 'pills-time'}
                >
                  <div className="capabilities text-center rounded pt-2 pb-2">
                    <div className="icon bg-custom mb-3">
                      <FaClock className="text-white" size={24} />
                    </div>
                    <h4 className="title font-weight-normal mb-0">Time <br /> Management</h4>
                  </div>
                </a>
              </li>
            </ul>

            <div className="tab-content mt-3" id="pills-tabContent" data-aos="fade-up">
              <div 
                className={`tab-pane fade ${activeTab === 'pills-cloud' ? 'show active' : ''}`}
                id="pills-cloud" 
                role="tabpanel" 
                aria-labelledby="pills-cloud-tab"
              >
                <div className="capabilities-content border rounded p-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h4 className="title">Marketing Cloud</h4>
                      <p className="text-muted">
                        Distinctively exploit optimal alignments for intuitive. Quickly coordinate business 
                        applications through revolutionary catalysts for chang the Seamlessly optimal testing 
                        procedures whereas processes.Synergistically evolve 2.0 technologies rather than just 
                        in web & apps development.
                      </p>
                      <ul className="mb-0">
                        <li className="mt-2">Quickly coordinate business</li>
                        <li className="mt-2">Distinctively exploit optimal alignments</li>
                        <li className="mt-2">Seamlessly optimal testing procedures</li>
                        <li className="mt-2">Applications through revolutionary</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mt-4 pt-2">
                      <img src="images/feature/marketing.svg" className="img-fluid d-block mx-auto" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div 
                className={`tab-pane fade ${activeTab === 'pills-smart' ? 'show active' : ''}`}
                id="pills-smart" 
                role="tabpanel" 
                aria-labelledby="pills-smart-tab"
              >
                <div className="capabilities-content border rounded p-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h4 className="title">Smartest CRM</h4>
                      <p className="text-muted">
                        Distinctively exploit optimal alignments for intuitive. Quickly coordinate business 
                        applications through revolutionary catalysts for chang the Seamlessly optimal testing 
                        procedures whereas processes.Synergistically evolve 2.0 technologies rather than just 
                        in web & apps development.
                      </p>
                      <ul className="mb-0">
                        <li className="mt-2">Quickly coordinate business</li>
                        <li className="mt-2">Distinctively exploit optimal alignments</li>
                        <li className="mt-2">Seamlessly optimal testing procedures</li>
                        <li className="mt-2">Applications through revolutionary</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mt-4 pt-2">
                      <img src="images/feature/crm.svg" className="img-fluid d-block mx-auto" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div 
                className={`tab-pane fade ${activeTab === 'pills-apps' ? 'show active' : ''}`}
                id="pills-apps" 
                role="tabpanel" 
                aria-labelledby="pills-apps-tab"
              >
                <div className="capabilities-content border rounded p-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h4 className="title">Commerce Apps</h4>
                      <p className="text-muted">
                        Distinctively exploit optimal alignments for intuitive. Quickly coordinate business 
                        applications through revolutionary catalysts for chang the Seamlessly optimal testing 
                        procedures whereas processes.Synergistically evolve 2.0 technologies rather than just 
                        in web & apps development.
                      </p>
                      <ul className="mb-0">
                        <li className="mt-2">Quickly coordinate business</li>
                        <li className="mt-2">Distinctively exploit optimal alignments</li>
                        <li className="mt-2">Seamlessly optimal testing procedures</li>
                        <li className="mt-2">Applications through revolutionary</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mt-4 pt-2">
                      <img src="images/feature/apps.svg" className="img-fluid d-block mx-auto" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className={`tab-pane fade ${activeTab === 'pills-intelligence' ? 'show active' : ''}`}
                id="pills-intelligence" 
                role="tabpanel" 
                aria-labelledby="pills-intelligence-tab"
              >
                <div className="capabilities-content border rounded p-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h4 className="title">Business Intelligence</h4>
                      <p className="text-muted">
                        Distinctively exploit optimal alignments for intuitive. Quickly coordinate business 
                        applications through revolutionary catalysts for chang the Seamlessly optimal testing 
                        procedures whereas processes.Synergistically evolve 2.0 technologies rather than just 
                        in web & apps development.
                      </p>
                      <ul className="mb-0">
                        <li className="mt-2">Quickly coordinate business</li>
                        <li className="mt-2">Distinctively exploit optimal alignments</li>
                        <li className="mt-2">Seamlessly optimal testing procedures</li>
                        <li className="mt-2">Applications through revolutionary</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mt-4 pt-2">
                      <img src="images/feature/apps.svg" className="img-fluid d-block mx-auto" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className={`tab-pane fade ${activeTab === 'pills-automation' ? 'show active' : ''}`}
                id="pills-automation" 
                role="tabpanel" 
                aria-labelledby="pills-automation-tab"
              >
                <div className="capabilities-content border rounded p-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h4 className="title">Automation Engine</h4>
                      <p className="text-muted">
                        Distinctively exploit optimal alignments for intuitive. Quickly coordinate business 
                        applications through revolutionary catalysts for chang the Seamlessly optimal testing 
                        procedures whereas processes.Synergistically evolve 2.0 technologies rather than just 
                        in web & apps development.
                      </p>
                      <ul className="mb-0">
                        <li className="mt-2">Quickly coordinate business</li>
                        <li className="mt-2">Distinctively exploit optimal alignments</li>
                        <li className="mt-2">Seamlessly optimal testing procedures</li>
                        <li className="mt-2">Applications through revolutionary</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mt-4 pt-2">
                      <img src="images/feature/apps.svg" className="img-fluid d-block mx-auto" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className={`tab-pane fade ${activeTab === 'pills-time' ? 'show active' : ''}`}
                id="pills-time" 
                role="tabpanel" 
                aria-labelledby="pills-time-tab"
              >
                <div className="capabilities-content border rounded p-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h4 className="title">Time Management</h4>
                      <p className="text-muted">
                        Distinctively exploit optimal alignments for intuitive. Quickly coordinate business 
                        applications through revolutionary catalysts for chang the Seamlessly optimal testing 
                        procedures whereas processes.Synergistically evolve 2.0 technologies rather than just 
                        in web & apps development.
                      </p>
                      <ul className="mb-0">
                        <li className="mt-2">Quickly coordinate business</li>
                        <li className="mt-2">Distinctively exploit optimal alignments</li>
                        <li className="mt-2">Seamlessly optimal testing procedures</li>
                        <li className="mt-2">Applications through revolutionary</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mt-4 pt-2">
                      <img src="images/feature/apps.svg" className="img-fluid d-block mx-auto" alt="" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;