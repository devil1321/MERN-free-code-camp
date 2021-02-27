import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
export default class CreateExercise extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            description:'',
            duration:0,
            date:new Date(),
            users:[]
        }
    }

    componentDidMount(){
      axios.get('https://mern-app-fcc.herokuapp.com//users')
        .then(res=>{
            if(res.data.length > 0){
                this.setState({
                    users:res.data.map(user=>user.username),
                    username:res.data[0].username
                })
            }
        })
    }

    onChangeUsername = (e) =>{
        this.setState({
            username:e.target.value
        })
    }
    
    onChangeDescription = (e) =>{
        this.setState({
            description:e.target.value
        })
    }
    
    onChangeDuration = (e) =>{
        this.setState({
            duration:e.target.value
        })
    }
    
    onChangeDate = (date) =>{
        this.setState({
            date:date
        })
    }

    onSubmit(e){
        e.preventDefault()
        const exercise = {
            username:this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date
        }
        console.log(exercise)
        axios.post('https://mern-app-fcc.herokuapp.com/exercises/add',exercise)
            .then(res =>console.log(res.data))
            .catch(err =>console.log(err))
        window.location = '/'
    }

    render() {
        return (
            <div>
               <h3>Create New Exercice Log</h3>
               <form onSubmit={(e)=>{this.onSubmit(e)}}>
                   <div className="form-group">
                   <label>Username:</label>
                       <select ref='userInput' className="form-control" value={this.state.username} onChange={(e)=>{this.onChangeUsername(e)}} required>
                           {this.state.users.map(user=>{
                               return <option key={user} value={user}>{user}</option>
                           })}
                       </select>
                   </div>
                   <div className="form-group">
                       <label>Description:</label>
                       <input className="form-control" type="text" value={this.state.description} onChange={(e)=>{this.onChangeDescription(e)}}/>
                   </div>
                   <div className="form-group">
                       <label>Duration (in minutes):</label>
                       <input className="form-control" type="text" value={this.state.duration} onChange={(e)=>{this.onChangeDuration(e)}}/>
                   </div>
                   <div className="form-group">
                       <label>Date:</label>
                       <div className="mt-2">
                           <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
                       </div>
                   </div>
                   <div className="form-group">
                       <input className="btn btn-primary" type="submit" value="Create Exercise Log"/>
                   </div>
               </form>
            </div>
        )
    }
}

