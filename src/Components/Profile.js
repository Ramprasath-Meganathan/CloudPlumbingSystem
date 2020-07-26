import React, { Component } from 'react'


class Profile extends Component {

    constructor() {
        super()
        this.state = {
            names: []
        }

    }
    componentDidMount() {
        // getUserDetails().then(res => {
        //     this.setState({ names: res.data })
        // })
    }

    render() {

        const items = this.state.names.filter(item => item.email !== localStorage.getItem('user').trim().toLowerCase()).map((item) =>
            <li key={item.email}>{item.name}</li>
        )

        const userLoggedIn = this.state.names.filter((item => (item.email ===
            localStorage.getItem('user').trim().toLowerCase()))).map(item => { return item.name })
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">User Profile details</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <body>
                            <tr>
                                <td>Hi, {userLoggedIn}  you are logged in </td>
                            </tr>
                            <tr>
                                <td>Here are other users who are online</td><br />
                                <td>{items}</td>
                            </tr>
                        </body>
                    </table>
                </div>
            </div>
        )
    }


}


export default Profile