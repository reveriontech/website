import React from 'react';

const Team = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Rod Albores",
      position: "Founder",
      image: "images/profile/profile1.jpg"
    },
    {
      id: 2,
      name: "Sarah Murli",
      position: "Founder",
      image: "images/profile/profile2.jpg"
    },
    {
      id: 3,
      name: "Eion Morgan",
      position: "Manager",
      image: "images/profile/profile3.jpg"
    },
    {
      id: 4,
      name: "Rambha Godse",
      position: "Accountant",
      image: "images/profile/profile4.jpg"
    },
    {
      id: 5,
      name: "Rambha Godse",
      position: "Accountant",
      image: "images/profile/profile5.jpg"
    },
    {
      id: 6,
      name: "Rambha Godse",
      position: "Accountant",
      image: "images/profile/profile6.jpg"
    },
    {
      id: 7,
      name: "Rambha Godse",
      position: "Accountant",
      image: "images/profile/profile7.jpg"
    },
    {
      id: 8,
      name: "Rambha Godse",
      position: "Accountant",
      image: "images/profile/profile8.jpg"
    }
  ];

  // Social media links (same for all team members in this example)
  const socialLinks = [
    { icon: "mdi-facebook", title: "Facebook", url: "#" },
    { icon: "mdi-linkedin", title: "Linkedin", url: "#" },
    { icon: "mdi-youtube", title: "Youtube", url: "#" },
    { icon: "mdi-instagram", title: "Instagram", url: "#" }
  ];

  return (
    <section className="section" id="team">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="section-title" data-aos="fade-up">
              <h4 className="title text-uppercase mb-4">Our Team</h4>
              <p className="text-muted mx-auto para-desc mb-0">
                Launch your project and leverage our expertise in designing and 
                managing high-performance, conversion-focused websites.
              </p>
            </div>
          </div>
        </div>

        <div className="row" data-aos="fade-up">
          {teamMembers.map((member) => (
            <div className="col-lg-3 col-md-6 col-12" key={member.id}>
              <div className="team-detail bg-light rounded text-center p-3 pb-4">
                <div className="image position-relative">
                  <img 
                    src={member.image} 
                    className="avatar avatar-medium rounded-pill" 
                    alt={member.name} 
                  />
                </div>
                <div className="content mt-3">
                  <h4 className="name mb-0">{member.name}</h4>
                  <h6 className="designation text-muted font-weight-normal">{member.position}</h6>
                  <br />
                  <ul className="list-unstyled social-icon mb-0 mt-4">
                    {socialLinks.map((social, index) => (
                      <li className="list-inline-item" key={index}>
                        <a href={social.url}>
                          <i className={`mdi ${social.icon}`} title={social.title}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;