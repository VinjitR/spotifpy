import React, { Component } from 'react'
import axios from 'axios';

const api= axios.create()

export default class Home extends Component {

    constructor(){
        super();
        let baseUrl="http://127.0.0.1:8080";
        api.get(baseUrl+'/profile').then(res=>{
            console.log(res)
        })
    }
    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}

