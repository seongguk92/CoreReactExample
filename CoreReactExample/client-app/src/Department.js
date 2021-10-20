import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {localApi} from './api';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';

import axios from "axios";

export class Department extends Component{
    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    async refreshList(){
        try{
            const {data} = await localApi.department();
            this.setState({deps:data});
        }catch{

        }
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm("Are you sure?")){
            axios.delete(process.env.REACT_APP_API+'department/' + depid)
            .then(res=>alert(res.data)
            ,(error)=>{
                 alert(error);
            })  
        }
    }

    render(){
        const {deps,depid,depname}=this.state;
        let addMdalClose=()=>this.setState({addModalShow:false});
        let editMdalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>DepartmentName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" 
                                        onClick={()=>this.setState(
                                                {
                                                    editModalShow:true
                                                    ,depid:dep.DepartmentId
                                                    ,depname:dep.DepartmentName
                                                }
                                            )
                                        }>   
                                            Edit  
                                        </Button>
                                        <Button className="mr-2" variant="danger" 
                                        onClick={()=>this.deleteDep(dep.DepartmentId)}>   
                                            Delete  
                                        </Button>
                                        <EditDepModal show={this.state.editModalShow}
                                            onHide={editMdalClose}
                                            depid={depid}
                                            depname={depname} 
                                        />
                                    </ButtonToolbar> 
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
                        Add Department
                    </Button>
                </ButtonToolbar>
                <AddDepModal show={this.state.addModalShow} onHide={addMdalClose} /> 
            </div>
        )
    }
};