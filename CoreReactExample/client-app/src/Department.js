import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {localApi} from './api';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';

export class Department extends Component{
    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false}
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

    render(){
        const {deps}=this.state;
        let addMdalClose=()=>this.setState({addModalShow:false});
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
                                <td>Edit / Delete</td>
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