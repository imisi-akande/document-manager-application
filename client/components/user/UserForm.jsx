import React from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../actions/UserAction';


const Register = (props) => {
  const { saveUser } = props;
  const onSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const userName = e.target.userName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    const user = { firstName, userName, lastName, email, password, role };
    saveUser(user);
  };
  return (<main>
    <center>

      <div className="container" style={{ width: 700 }}>
        <div className="z-depth-1 grey lighten-4 row">

          <form className="col s12" method="post" onSubmit={onSubmit}>
            <div className="row">
              <div className="col s12" />
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate" type="text" name="firstName"
                  id="firstName" required
                />
                <label htmlFor="email">firstName</label>
              </div>
            </div>


            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate" type="text" name="lastName"
                  id="lastName" required
                />
                <label htmlFor="email">lastName</label>
              </div>
            </div>


            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate" type="text" name="userName"
                  id="userName" required
                /><label htmlFor="userName">userName</label>
              </div>
            </div>


            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate" type="email" name="email"
                  id="email" required
                />
                <label
                  htmlFor="email" html="email" data-error="wrong"
                  data-success="right"
                >email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate" type="password"
                  name="password" id="password" required
                />
                <label
                  htmlFor="password" data-error="wrong"
                  data-success="right" html="password"
                >password</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate" type="text" name="role"
                  id="role"
                />
                <label
                  htmlFor="role" data-error="wrong" data-success="right"
                  html="role"
                >role</label>
              </div>

            </div>
            <br />
            <center>
              <div className="row">
                <button
                  type="submit" name="btn_login"
                  className="col s12 btn btn-large waves-effect teal darken-2"
                >
                SAVE</button>
              </div>
            </center>
          </form>
        </div>
      </div>
    </center>

    <div className="section" />
    <div className="section" />
  </main>
  );
};

Register.propTypes = {
  saveUser: React.PropTypes.func.isRequired,
};
// we map our dispatch to custom saveUser props
const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(userActions.saveUser(user))
});

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
