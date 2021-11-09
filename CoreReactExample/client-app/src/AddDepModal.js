import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from "axios";

export class AddDepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        axios.post(process.env.REACT_APP_API+'department', {
            DepartmentId:null,
            DepartmentName:event.target.DepartmentName.value
        })
        .then(res=>alert(res.data)
        ,(error)=>{
            alert(error);
        })
        //
        // .then((result)=>{
        //     alert(result);
        // },
        // (error)=>{
        //     alert('Failed');
        // })
    }

    render(){
        return(
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Department
                        </Modal.Title>
                    </Modal.Header>   
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>
                                            DepartmentName
                                        </Form.Label>
                                        <Form.Control type="text" name="DepartmentName" required placeholder="DepartmentName"/>
                                    </Form.Group>
                                    <Button variant="primary" type="submt">
                                        Add Department
                                    </Button>
                                </Form>
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