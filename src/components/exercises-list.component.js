import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Exercise = (props) =>(
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}><i class="fas fa-edit"></i>  </Link> | <i className="fas fa-trash-alt text-danger" href="#" onClick={()=>{props.deleteExercise(props.exercise._id)}}></i>
        </td>
    </tr>
)


export default class ExercisesList extends Component {
    constructor(props){
        super(props)
        this.state={
            exercises:[]
        }
    }
    componentDidMount(){
        axios.get('https://mern-app-fcc.herokuapp.com/exercises')
            .then(res=>{
                this.setState({exercises:res.data})
            })
            .catch(err => {console.log(err)})
    }


    deleteExercise = (id) =>{
        axios.delete('https://mern-app-fcc.herokuapp.com/exercises/' + id)
            .then(res=>{
                console.log(res.data)
            })
            .catch(err =>console.log(err))
        this.setState({
            exercises:this.state.exercises.filter(el =>el._id !== id)
        })
    }

    exerciseList = () =>{
        return this.state.exercises.map(currentEx =>{
            return <Exercise exercise={currentEx} deleteExercise={this.deleteExercise} key={currentEx._id}/>
        })
    }
    render() {
        return (
            <div className="table-responsive-sm">
                <h3>Logged Exercises</h3>
                <table className="table table-hover">
                    <thead className="thead-light">     
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

