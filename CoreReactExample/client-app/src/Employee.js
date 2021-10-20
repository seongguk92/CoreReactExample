import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {localApi} from './api';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

import axios from "axios";

export class Employee extends Component{
    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    async refreshList(){
        try{
            const {data} = await localApi.employee();
            this.setState({emps:data});
        }catch{

        }
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm("Are you sure?")){
            axios.delete(process.env.REACT_APP_API+'employee/' + empid)
            .then(res=>alert(res.data)
            ,(error)=>{
                 alert(error);
            })  
        }
    }

    render(){
        const {emps, empid, empname, depmt, photofilename, doj}=this.state;
        let addMdalClose=()=>this.setState({addModalShow:false});
        let editMdalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>EmployeeName</th>
                            <th>Department</th>
                            <th>DOJ</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" 
                                        onClick={()=>this.setState(
                                                {
                                                    editModalShow:true
                                                    ,empid:emp.EmployeeId
                                                    ,empname:emp.EmployeeName
                                                    ,depmt:emp.Department
                                                    ,photo:emp.photofilename
                                                    ,doj:emp.DateOfJoining
                                                }
                                            )
                                        }>   
                                            Edit  
                                        </Button>
                                        <Button className="mr-2" variant="danger" 
                                        onClick={()=>this.deleteEmp(emp.EmployeeId)}>   
                                            Delete  
                                        </Button>
                                        <EditEmpModal show={this.state.editModalShow}
                                            onHide={editMdalClose}
                                            empid={empid}
                                            empname={empname} 
                                            depmt={depmt} 
                                            photofilename={photofilename} 
                                            doj={doj} 
                                        />
                                    </ButtonToolbar> 
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
                        Add Employee
                    </Button>
                </ButtonToolbar>
                <AddEmpModal show={this.state.addModalShow} onHide={addMdalClose} /> 
            </div>
        )
    }
};