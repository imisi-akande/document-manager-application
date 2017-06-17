import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/**
 * anonymous function - checks if component requires authentication
 *
 * @param  {object} ComponentRequiresAuth component to be rendered
 * @return {class} - none
 */
export default function (ComponentRequiresAuth) {
  /**
   * Authentication is required
   *
   * @class RequiresAuthentication
   * @extends {React.Component}
   */
  class RequiresAuthentication extends React.Component {
    /**
     * componentWillMount - is called before dom renders
     *
     * @return {void}  none
     */
    componentWillMount() {
      if (!this.props.isAuthenticated[0]) {
        Materialize.toast('You need to be signed in to view this page.', 4000);
        return browserHistory.push('/login');
      }
    }

    /**
     * render - renders dom
     *
     * @return {object}  dom to be rendered
     */
    render() {
      return (
        <div />
      );
    }
  }

  RequiresAuthentication.propTypes = {
    isAuthenticated: PropTypes.array.isRequired
  };


  /**
   * mapStateToProps - maps state to props
   *
   * @param  {object} state - object representing current state
   * @return {object}       object representing current state
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.user
    };
  }

  return connect(mapStateToProps, {})(RequiresAuthentication);
}
