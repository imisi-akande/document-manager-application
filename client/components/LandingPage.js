import React from 'react';
import Typist from 'react-typist';
import { Link } from 'react-router';
import bgimage from '../img/doc-image.jpg';

const docStyle = {
  backgroundImage: 'url(' + bgimage + ')',
  height:900,
};

class HomePage extends React.Component {
  /**
   * renders the HomePage component
   * @returns {void}
   * @memberOf HomePage
   */
  render() {
    return (
    <div style={docStyle}>
      <div className="parallax-container"> 
      <div id="parallax">
        <Typist className="Typist">
          <h3><p className="ptag black-text"> Welcome to the place of smart documentation...</p></h3>
	      </Typist>
	    </div>
	  </div>
    ;
    <div className="section" style={{ backgroundColor: 'rgba(111, 170, 129, 0.8)' }}>
    <div className="row container">
      <h2 className="header">Amazing Facts!!!</h2>
      <ul>
      <p className="white-text text-darken-3 lighten-3">Do you know you can operate paperless? </p>
      <p className="white-text text-darken-3 lighten-3">Do you know you can format your texts and display the way it suites your purpose? </p>
      <p className="white-text text-darken-3 lighten-3">Do you know you can actually bank your documents and keep it safe for years without damage or loss? </p>
      <p className="white-text text-darken-3 lighten-3">Do you know your documents can be made private to you and you alone? </p>
     <p className="white-text text-darken-3 lighten-3">We gladly offer this services for free......</p>
      <Link to= "/signup" className="waves-effect waves-light btn cyan darken-4 white-text">Get Started</Link>
      </ul>
    </div>
		</div>
    </div>
    );
  }
}

export default HomePage;
