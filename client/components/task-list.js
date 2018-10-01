import React, { Component }  from 'react';
import axios from 'axios';
import history from '../history';
import { Link } from 'react-router-dom';

const taskStyle = {
  marginTop: '40px',
  borderBottom: '1px solid grey'
};

export default class TaskList extends Component {

  constructor(props) {
    super(props);
    
    this.logout = this.logout.bind(this);
    this.state = {
      data: []
    }
  }

  logout(){
    axios.post('/api/logout')
      .then(function (response) {
        console.log(response);
        history.push('/');
      })
      .catch(function (error) {
        console.log(error);
        history.push('/');
      });
  }

  componentDidMount(){
    let ref = this;
    axios.get('/api/tasks')
    .then(function (response) {
      console.log(response);
      ref.setState({
        data: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h3>Welcome</h3>
        <button onClick={this.logout}>Logout</button>
        <Link to="/add-task"><button>Create Task</button></Link>
        {this.state.data.map(task => (
          <div key={task._id} style={taskStyle}>
            <Link to={"/edit-task/" + task._id}><button>Edit</button></Link>
            <Link to={"/delete-task/" + task._id}><button>Delete</button></Link>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            {task.doneyet && (
              <p>Done!</p>
            )}
          </div>
        ))}
      </div>
    );
  }
};

