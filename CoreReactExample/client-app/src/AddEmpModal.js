import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import axios from "axios";
import {localApi} from './api';

export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    async componentDidMount(){
        try{
            const {data} = await localApi.department();
            this.setState({deps:data});
        }catch{

        }
    }

    photofilename= "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    handleSubmit(event){
        event.preventDefault();
        axios.post(process.env.REACT_APP_API+'employee', {
            EmployeeId:null,
            EmployeeName:event.target.EmployeeName.value,
            Department:event.target.Department.value,
            DateOfJoining:event.target.DateOfJoining.value,
            PhotoFileName:this.photofilename
        })
        .then(res=>alert(res.data)
        ,(error)=>{
            alert(error);
        })
        
        // .then((result)=>{
        //     alert(result);
        // },
        // (error)=>{
        //     alert('Failed');
        // })
    }

    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        axios.post(process.env.REACT_APP_API+'employee/SaveFile', {
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert("Failed");
        })
    }


    render(){
        return(
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>   
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>
                                            EmployeeName
                                        </Form.Label>
                                        <Form.Control type="text" name="EmployeeName" required placeholder="EmployeeName"/>
                                    </Form.Group>

                                    <Form.Group controlId="Department">
                                        <Form.Label>
                                            Department
                                        </Form.Label>
                                        <Form.Control as ="select">
                                            {this.state.deps.map(dep=>
                                                <option key={dep.DepartmentId}>{dep.DepartmentName}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>
                                            DateOfJoining
                                        </Form.Label>
                                        <Form.Control as ="select"
                                            type="date"
                                            name="DateOfJoining"
                                            required
                                            placeholder="DateOfJoining"
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submt">
                                        Add Employee
                                    </Button>
                                </Form>
                            </Col>
                            <Col som={6}>
                                <Image width="200px" height="200px" src={this.imagesrc}/>
                                <input onChange={this.handleFileSelected} type="File"/>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}