import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import request from 'superagent';
import * as userActions from '../actions/userAction';


const Register = (props) => {
  const { saveUser } = props;
  const onSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const userName = e.target.userName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = { firstName, userName, lastName, email, password };
    saveUser(user);
  }
  return ( <main>
      <center>
        <div className="section"></div>
        <h5 className="green-text">Create account</h5>
        <div className="section"></div>

        <div className="container" style={{ width: 700 }}>
          <div className="z-depth-1 grey lighten-4 row">

            <form className="col s12" method="post" onSubmit={onSubmit}>
              <div className='row'>
                <div className='col s12'>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input className='validate' type='text' name='firstName' id='firstName' />
                  <label htmlFor='email'>Enter your firstName</label>
                </div>
              </div>


              <div className='row'>
                <div className='input-field col s12'>
                  <input className='validate' type='text' name='lastName' id='lastName' />
                  <label htmlFor='email'>Enter your lastName</label>
                </div>
              </div>


              <div className='row'>
                <div className='input-field col s12'>
                  <input className='validate' type='text' name='userName' id='userName' />
                  <label htmlFor='userName'>Enter your userName</label>
                </div>
              </div>


              <div className='row'>
                <div className='input-field col s12'>
                  <input className='validate' type='email' name='email' id='email' />
                  <label htmlFor='email' for="email" data-error="wrong" data-success="right">Enter your email</label>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input className='validate' type='password' name='password' id='password' />
                  <label for="password" data-error="wrong" data-success="right" htmlFor='password'>Enter your password</label>
                </div>

              </div>

              <br />
              <center>
                <div className='row'>
                  <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect teal darken-2'>Signup</button>
                </div>
              </center>
            </form>
          </div>
        </div>
        Already a user? <a href="/login">Login</a>
      </center>

      <div className="section"></div>
      <div className="section"></div>
    </main>
  );
};
// we map our dispatch to custom saveUser props
const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(userActions.saveUser(user))
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);