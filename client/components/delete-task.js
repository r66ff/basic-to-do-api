import React, { Component }  from 'react';
import axios from 'axios';
import history from '../history';
import { Link } from 'react-router-dom';

const formStyle = {
  marginTop: '40px'
};

export default class DeleteTask extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = props.handleSubmit;
    this.name = props.name;
    this.displayName = props.displayName;
    this.id = props.id;

  }

  render() {
    return (
      <div>
        <h3>Are you sure you want to delete the task?</h3>
        <button onClick={this.logout}>Logout</button>
        <Link to="/tasks"><button>All Tasks</button></Link>
        <div>
          <form onSubmit={this.handleSubmit} name={this.name} style={formStyle} >
            <input name="id" type="hidden" value={this.id} />
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

