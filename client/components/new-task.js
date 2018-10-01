import React, { Component }  from 'react';
import axios from 'axios';
import history from '../history';
import { Link } from 'react-router-dom';

const formStyle = {
  marginTop: '40px'
};

export default class NewTask extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = props.handleSubmit;
    this.name = props.name;
    this.displayName = props.displayName;

  }

  render() {
    return (
      <div>
        <h3>Add New Task</h3>
        <button onClick={this.logout}>Logout</button>
        <Link to="/tasks"><button>All Tasks</button></Link>
        <div>
          <form onSubmit={this.handleSubmit} name={this.name} style={formStyle}>
            <div>
              <label htmlFor="title">
                <small>Title</small>
              </label>
              <input name="title" type="text" />
            </div>
            <div>
              <label htmlFor="description">
                <small>Description</small>
              </label>
              <input name="description" type="text" />
            </div>
            <div>
              <button type="submit">{this.displayName}</button>
            </div>
            {this.error && this.error.response && <div> {this.error.response.data} </div>}
          </form>
        </div>
      </div>
    );
  }
};

