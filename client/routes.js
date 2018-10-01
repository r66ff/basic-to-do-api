import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Auth,
          Tasks,
          NewTask,
          EditTask,
          DeleteTask
        } from './components';
import axios from 'axios';
import history from './history';

export default class Routes extends Component {
  constructor(props){
    super(props);

    this.state = {
      error: null,
      isLoggedIn: false,
      loc: history.location.pathname
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    
    const ref = this;

    if(formName === 'signup'){
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      axios.post('/api/signup', {
        username: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
        ref.setState({
          isLoggedIn: true
        })
        history.push('/tasks');
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if(formName === 'login'){
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      axios.post('/api/login', {
        username: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
        ref.setState({
          isLoggedIn: true
        })
        history.push('/tasks');
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if(formName === 'new-task'){
      const title = evt.target.title.value;
      const description = evt.target.description.value;
      axios.post('/api/tasks/create', {
        title: title,
        description: description,
        doneyet: false
      })
      .then(function (response) {
        console.log(response);
        history.push('/tasks');
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if(formName === 'edit-task'){
      const title = evt.target.title.value;
      const description = evt.target.description.value;
      const done = evt.target.done.checked;
      const id = evt.target.id.value;
      axios.post('/api/tasks/edit/' + id, {
        title: title,
        description: description,
        doneyet: done
      })
      .then(function (response) {
        console.log(response);
        history.push('/tasks');
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if(formName === 'delete-task'){
      const id = evt.target.id.value;
      axios.post('/api/tasks/delete/' + id)
      .then(function (response) {
        console.log(response);
        history.push('/tasks');
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  }

  componentDidMount(){
    console.log(history);
    const ref = this;
    axios.get('/api/loggedin')
    .then(function (response) {
      console.log(response);
      ref.setState({
        isLoggedIn: true
      })
      history.push('/tasks');
    })
    .catch(function (error) {
      console.log(error);
      ref.setState({
        isLoggedIn: false
      })
      history.push('/login');
    });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" render={() => {
          return <Auth handleSubmit={this.handleSubmit} name="login" displayName="Login" error={this.state.error} />
        }} />
        <Route path="/login" render={() => {
          return <Auth handleSubmit={this.handleSubmit} name="login" displayName="Login" error={this.state.error} />
        }} />
        <Route path="/signup" render={() => {
          return <Auth handleSubmit={this.handleSubmit} name="signup" displayName="Signup" error={this.state.error} />
        }} />
        { console.log(isLoggedIn)}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/tasks" render={() => {
              return <Tasks />
            }} />
            <Route path="/add-task" render={() => {
              return <NewTask handleSubmit={this.handleSubmit} name="new-task" displayName="Add Task" />
            }} />
            <Route path="/edit-task/:id" render={(data) => {
              return <EditTask handleSubmit={this.handleSubmit} name="edit-task" displayName="Edit Task"  id={data.match.params.id} />
            }} />
            <Route path="/delete-task/:id" render={(data) => {
              return <DeleteTask handleSubmit={this.handleSubmit} name="delete-task" displayName="Delete Task"  id={data.match.params.id} />
            }} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route render={() => {
          return <Auth handleSubmit={this.handleSubmit} name="login" displayName="Login" error={this.state.error} />
        }} />
      </Switch>
    );
  }
}
