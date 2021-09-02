import React from "react";
import {auth,db, getUser} from '../firebase/firebase'
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import './UserPage.css'
import { Card, Icon, Image } from 'semantic-ui-react'
import CardMedia from '@material-ui/core/CardMedia';
import milk from '../layout/images/milk.jpg';


export function BackPage(prop,data)
{
    console.log("BackPage_data: "+data)

    prop.history.push({
        pathname: `${prop.history.goBack()}`,
        data: data,
    })

}
export function NextPage(prop,path,data)
{
    prop.history.push({
        pathname: `${prop.location.pathname}/${path}`,
        data: data,
    })
}


class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: [true,'נא להמתין הדף נטען'],
            loadPage:false,
            isLoad:false,
            user: props.location,
            error:false,

            loading: true,
            form: {
                product: "",
                price: "",
                imgUrl:"",
            }
        };
    }

    loadPage(event){
        this.setState({loading:event})
        //    this.render()
    }

    async componentDidMount() {
        auth.onAuthStateChanged(async user=>{

            if(user)
            {

                // console.log(user)
                var type =await getUser(user)
                await this.setState({
                    isLoad: true,
                    user: user,
                    type: type
                })



            }
            else {
                this.setState({
                    isLoad: true,
                })
                window.location.href = '/Login';
                return;

            }

        })

    }

    async  logout() {
        //מסך טעינה
        await auth.signOut();
        window.location.href = '/';
        //סיום מסך טעינה
    }

    render() {

        if (this.state) {
            return (
                <div className="sec-design">
                    {this.userPage()}
                    <button id="mngRequestPurchase" className="btn btn-info" onClick={() => {
                        NextPage(this.props, "RequestPurchase", this.state.user)
                    }}>העגלה שלי<span
                        className="fa fa-arrow-right"></span></button>
                    {!this.state.user.email ? (null) : (
                        <div id="name-group" className="form-group">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container
                                          direction="row"
                                          justify="space-between"
                                          alignItems="center"
                                          spacing={2}>


                                                <Grid item xs={12}>
                                                    {this.Card(this.state.user)}
                                                </Grid>


                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            onClick={this.logout}>
                                            התנתק
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>





                    )}
                </div>
            );
        }
        else
            return (<div> {!this.state.spinner[0] ? "" :
                <div id='fr'>
                    {this.state.spinner[1]}
                    <div className="sweet-loading">

                    </div>
                </div>
            }</div>)
    }


    async sendProduct(price,products,img) {
        var path = auth.currentUser.uid

        try {
            var product = await db.collection("users").doc(path)
            var newRequestPurchase = await product.collection("prod").doc();

            await newRequestPurchase.set({
                price: price,
                product: products,
                image:img,
            })

            window.location.reload(true);
        } catch (error) {
            this.loadSpinner(false)
        }
    }
    Card(user) {
        return (
            <div className="Card"  dir="rtl">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <b>שם מוצר: חלב 3%</b>  <br/>
                        <b>מחיר: 5 ש"ח</b><br/>
                        <img
                            style={{margin: "0 auto", maxHeight: "150px"}}
                            src={milk} className="img-fluid d-block"/>
                    </Grid>


                    <Grid item xs={6}>
                        <button id="mngRequestPurchase" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: חלב 3%'
                            this.state.price='מחיר: 5 ש"ח'
                            this.state.imgUrl="https://drive.google.com/file/d/1vT72F_J_POo0a9DMWdC38Fn-4MtiFbmy/view?usp=sharing"
                            // this.save();
                            this.sendProduct(this.state.price,this.state.products,this.state.imgUrl)

                        }}>הוספה לסל
                        </button>

                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                </Grid>


            </div>
        );
    }


    loadUser(page)
    {
        this.props.history.push({

            pathname: `/${page}/${this.state.user.uid}`,
            data: this.state.user // your data array of objects
        })
    }





    userPage()
    {
        const { user , error} = this.state
        if(error)
            return (<h1>{error}</h1>)

        return(
            <div dir='rtl' >
                שלום {user.displayName}
            </div>
        )
    }

}


export  default  UserPage;