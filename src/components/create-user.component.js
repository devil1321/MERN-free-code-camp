import React, { Component } from 'react'
import axios from "axios"
export default class CreateUser extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
        }
    }
    onChangeUsername = (e) =>{
        this.setState({
            username:e.target.value
        })
    }
    onSubmit = (e) =>{
        e.preventDefault()
        const user = {
            username:this.state.username
        }
        console.log(user)

        axios.post('https://mern-app-fcc.herokuapp.com/users/add',user)
            .then(res=>{
                console.log(res.data)
            })
            .catch(err=>console.log(err))
        this.setState({
            username:''
        })
    }
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={(e)=>{this.onSubmit(e)}}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" className="form-control" value={this.state.username} onChange={(e)=>{this.onChangeUsername(e)}} required/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
