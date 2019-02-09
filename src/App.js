import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import Create from './components/Create'
import Edit from './components/Edit'
import { Table, Nav, NavItem, NavLink, Container } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:3001')
      .then(response => {
        this.setState({ data: response.data })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  componentDidUpdate() {
    axios.get('http://localhost:3001')
      .then(response => {
        this.setState({ data: response.data })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  hapusData(id) {
    axios.get(`http://localhost:3001/hapus/${id}`)
      .then(res => console.log(res.data))

    window.location.href = '/'
  }

  mapData() {
    return this.state.data.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{data.nama}</td>
          <td>{data.alamat}</td>
          <td>{data.telepon}</td>
          <td>{data.jk}</td>
          <td><Link to={`/edit/${data.id}`} className="btn btn-primary">Edit</Link> <button className="btn btn-danger" onClick={() => this.hapusData(data.id)}>Hapus</button></td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Router>
        <Container>
          <div className="App">
            <Nav>
              <NavItem>
                <NavLink><Link to={'/'}>Home</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to={'/create'}>Create</Link></NavLink>
              </NavItem>
            </Nav>

            <Route path='/' exact strict render={() => {
              return (
                <Table striped>
                  <thead>
                    <tr>
                      <th colSpan="6">Data</th>
                    </tr>
                    <tr>
                      <th>NO</th>
                      <th>Nama</th>
                      <th>Alamat</th>
                      <th>Telepon</th>
                      <th>Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.mapData()}
                  </tbody>
                </Table>
              )
            }} />
            <Route path="/create" render={() => {
              return (
                <Create />
              )
            }} />

            <Route path="/edit/:id" component={Edit} />
          </div>
        </Container>
      </Router>
    );
  }
}

export default App;
