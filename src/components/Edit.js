import React, { Component } from 'react';
import { Table, Button, Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class Edit extends Component {
    constructor() {
        super()

        this.state = {
            inputData: {
                nama: "",
                alamat: "",
                telepon: "",
                jk: "",
                foto: ""
            },
            initialUrlFile: ""
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        axios.get(`http://localhost:3001/edit/${id}`)
            .then(response => {
                this.setState({
                    inputData: {
                        nama: response.data.nama,
                        alamat: response.data.alamat,
                        telepon: response.data.telepon,
                        jk: response.data.jk,
                        foto: ""
                    },
                    initialUrlFile: "http://localhost:3001/images/" + response.data.foto
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleInputValue = (name, value) => {
        const inputData = this.state.inputData
        inputData[name] = value
        this.setState({ inputData })
        // console.log(this.state.inputData)
    }

    checkedValidation = value => {
        return this.state.inputData.jk === value
    }

    submitEditForm = (e) => {
        e.preventDefault();

        const { id } = this.props.match.params

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

        axios.post(`http://localhost:3001/edit/${id}`, formData, config)
            .then(res => console.log(res.data))
            .catch(function (error) {
                console.log(error);
            })

        this.props.history.push('/')
    }

    render() {

        let radio

        if (this.state.inputData.jk === "L") {
            radio = <div><FormGroup check>
                <Label check>
                    <Input type="radio" name="jk" value="L" onChange={event => this.handleInputValue('jk', event.target.value)} checked={this.checkedValidation("L")} />{' '}
                    Laki - Laki
                </Label>
            </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="jk" value="P" onChange={event => this.handleInputValue('jk', event.target.value)} checked={this.checkedValidation("P")} />{' '}
                        Perempuan
        </Label>
                </FormGroup></div>
        } else {
            radio = <div><FormGroup check>
                <Label check>
                    <Input type="radio" name="jk" value="L" onChange={event => this.handleInputValue('jk', event.target.value)} checked={this.checkedValidation("L")} />{' '}
                    Laki - Laki
            </Label>
            </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="jk" value="P" onChange={event => this.handleInputValue('jk', event.target.value)} checked={this.checkedValidation("P")} />{' '}
                        Perempuan
                </Label>
                </FormGroup></div>
        }

        return (
            <div>
                <form onSubmit={this.submitEditForm}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th colSpan="2">Edit Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Nama </th>
                                <td>
                                    <Input type="text" name="nama" id="nama" placeholder="Masukkan Nama" value={this.state.inputData.nama} onChange={event => this.handleInputValue('nama', event.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th>Alamat </th>
                                <td><Input type="textarea" name="alamat" id="alamat" placeholder="Masukkan Alamat" onChange={event => this.handleInputValue('alamat', event.target.value)} value={this.state.inputData.alamat} /></td>
                            </tr>
                            <tr>
                                <th>Telepon </th>
                                <td>
                                    <Input type="text" name="telepon" id="telepon" placeholder="Masukkan Telepon" onChange={event => this.handleInputValue('telepon', event.target.value)} value={this.state.inputData.telepon} />
                                </td>
                            </tr>
                            <tr>
                                <th>Gender </th>
                                <td>
                                    {radio}
                                </td>
                            </tr>
                            <tr>
                                <th>Foto</th>
                                <td><img src={this.state.initialUrlFile} width="100" alt="images" /></td>
                            </tr>
                            <tr>
                                <th>Ganti Foto </th>
                                <td>
                                    <Input type="file" name="foto" id="foto" onChange={event => this.handleInputValue('foto', event.target.files[0])} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2"><Button>Edit</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </form>
            </div>
        );
    }
}

export default withRouter(Edit);