import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/**
 * anonymous function - checks if user is already authenticated
 *
 * @param  {object} ComponentRequiresAuth component to be rendered
 * @return {class} - none
 */
export default function (ComponentRequiresAuth) {
  /**
   *
   */
  class AlreadyAuthenticated extends React.Component {
    /**
     * componentWillMount - is called before dom renders
     *
     * @return {void}  none
     */
    componentWillMount() {
      if (this.props.isAuthenticated) {
        browserHistory.push('/documents');
      }
    }

    /**
     * render - renders dom
     *
     * @return {object}  dom to be rendered
     */
    render() {
      return (
        <ComponentRequiresAuth {...this.props} />
      );
    }
  }

  /**
   * mapStateToProps - maps state to props
   *
   * @param  {object} state - object representing current state
   * @return {object}       object representing current state
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.isAuthenticated
    };
  }

  return connect(mapStateToProps, {})(AlreadyAuthenticated);
}
