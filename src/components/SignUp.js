import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {db, RegisterUser,CreateNewUser} from "../firebase/firebase";
import './PageHome.css'



const options = [
]
let op = false

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname:'',
            email:'',
            phone:'',


        };


    }


    async onRegister() {
        try {

            if(!this.state.fname||!this.state.email||!this.state.phone) {
                alert("נא למלא את כל השדות החובה")
                return
            }
            await this.setState({approve:false})
            var newUser = await CreateNewUser(this.state.email,this.state.phone,this.state.fname)

            this.setState({uid:newUser.user.uid})

            await RegisterUser(newUser.user,this.state)

            alert("ההרשמה בוצעה בהצלחה")
            this.props.history.push({
                pathname: `/`,
            })
        } catch(error) {
            alert(error.message)
        }
    }


    render() {
        return (
            <div id="instructor" className="sec-design" dir='rtl'>
                <h2>הרשמה</h2>
                <div id="instructor_menu" className="form-design" name="student_form">
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                id="fname"
                                name="fname"
                                type="string"
                                autoComplete="off"
                                autoFocus
                                value={this.state.fname}
                                onChange={e => {
                                    this.setState({fname:e.target.value})

                                }}
                                variant="standard"
                                required
                                fullWidth
                                label="שם משתמש"
                            />
                        </Grid>

                        <Grid item xs={7}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                id="phone"
                                name="phone"
                                type="tel"
                                autoComplete="off"
                                value={this.state.phone}
                                onChange={e => {
                                    this.setState({phone:e.target.value})
                                    // this.setState({password:e.target.value})


                                }}
                                variant="standard"
                                required
                                fullWidth
                                label="סיסמא"
                            />
                        </Grid>


                        <Grid item xs={7}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="off"
                                value={this.state.email}
                                onChange={e => {
                                    this.setState({email:e.target.value})

                                }}
                                variant="standard"
                                required
                                fullWidth
                                label="Email"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    id="registerBtn"
                                    onClick={()=>{this.onRegister()}}
                                    register="true">

                                    הרשמה
                                </Button>
                            </div>
                        </Grid>


                        <Grid item xs={12}>
                            <div>

                                <Button
                                    type="submit"
                                    style={{style: {margin: '10px'}}}
                                    fullWidth
                                    variant="contained"
                                    id="LoginBtn"
                                    component={Link}
                                    to="/Login">
                                    כבר יש לך משתמש? התחברות
                                </Button>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    id="HomeBtn"
                                    component={Link}
                                    to="/">
                                    חזרה לעמוד הראשי
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </div>
        )
    }
}

export  default  SignUp;