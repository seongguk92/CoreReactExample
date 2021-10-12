import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {localApi} from './api';

export class Department extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]}
    }

    async refreshList(){
        try{
            const data = await localApi.department();
            console.log(data);
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
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>DepartmentId</tr>
                        <tr>DepartmentName</tr>
                        <tr>Options</tr>
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
            </div>
        )
    }
};