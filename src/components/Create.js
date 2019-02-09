import React, { Component } from 'react';
import { Table, Button, Input, FormGroup, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Create extends Component {
    state = {
        inputData: {
            nama: "",
            alamat: "",
            telepon: "",
            jk: "",
            foto: ""
        }
    }

    handleInputValue = (name, value) => {
        const inputData = this.state.inputData
        inputData[name] = value
        this.setState({ inputData })
        // console.log(this.state.inputData)
    }

    checked = value => {
        return this.state.inputData.jk === value
    }

    submitForm = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama', this.state.inputData.nama);
        formData.append('alamat', this.state.inputData.alamat);
        formData.append('telepon', this.state.inputData.telepon);
        formData.append('jk', this.state.inputData.jk);
        formData.append('foto', this.state.inputData.foto);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post('http://localhost:3001/create', formData, config)
            .then(res => { console.log(res.data) })
            .catch(function (error) {
                console.log(error);
            })

        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th colSpan="2">Tambah Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Nama </th>
                                <td>
                                    <Input type="text" name="nama" id="nama" placeholder="Masukkan Nama" onChange={event => this.handleInputValue('nama', event.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th>Alamat </th>
                                <td><Input type="textarea" name="alamat" id="alamat" placeholder="Masukkan Alamat" onChange={event => this.handleInputValue('alamat', event.target.value)} /></td>
                            </tr>
                            <tr>
                                <th>Telepon </th>
                                <td>
                                    <Input type="text" name="telepon" id="telepon" placeholder="Masukkan Telepon" onChange={event => this.handleInputValue('telepon', event.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th>Gender </th>
                                <td>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="jk" value="L" onChange={event => this.handleInputValue('jk', event.target.value)} checked={this.checked("L")} />{' '}
                                            Laki - Laki
                                    </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="jk" value="P" onChange={event => this.handleInputValue('jk', event.target.value)} checked={this.checked("P")} />{' '}
                                            Perempuan
                                    </Label>
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <th>Foto </th>
                                <td>
                                    <Input type="file" name="foto" onChange={event => this.handleInputValue('foto', event.target.files[0])} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2"><Button>Submit</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </form>
            </div>
        );
    }
}

export default withRouter(Create);