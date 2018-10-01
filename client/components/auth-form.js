import React, { Component }  from 'react';
import { Link } from 'react-router-dom';

export class Auth extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = props.handleSubmit;
    this.name = props.name;
    this.displayName = props.displayName;
    this.error = props.error;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} name={this.name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{this.displayName}</button>
          </div>
          {this.error && this.error.response && <div> {this.error.response.data} </div>}
        </form>
        {this.name === 'login' ?
          <div>
            <p>Don't have an account?</p>
            <Link to="/signup"><button>Signup</button></Link>
          </div> : null}
      </div>
    );
  }
};


