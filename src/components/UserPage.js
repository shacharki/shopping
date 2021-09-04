import React from "react";
import {auth, db, getProduct, getUser} from '../firebase/firebase'
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import './UserPage.css'
import firebase from 'firebase/app'

import milk from '../layout/images/milk.jpg';
import egg from '../layout/images/egg.jpg';
import bread from '../layout/images/bread.jpg';
import oil from '../layout/images/oil.jpg';
import sugar from '../layout/images/sugar.jpg';
import cheese from '../layout/images/cheese.jpg';



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
            productList: [],
            loading: true,
            form: {
                product: "",
                price: "",
                amount:"",
            }
        };
    }

    loadPage(event){
        this.setState({loading:event})
    }

    async componentDidMount() {
        auth.onAuthStateChanged(async user=>{

            if(user)
            {

                var type =await getUser(user)
                const productList = await getProduct(user.uid)
                await this.setState({
                    isLoad: true,
                    user: user,
                    type: type,
                    productList
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
                <div className="sec-design1">
                    {this.userPage()}
                    <button id="product" className="btn btn-info" onClick={() => {
                        NextPage(this.props, "ShoppingCart", this.state.user)
                    }}>העגלה שלי<span
                        className="fa fa-arrow-right"></span></button>
                    <br/>
                    <br/>
                    {!this.state.user.email ? (null) : (
                        <div id="name-group" className="form-group">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container
                                          direction="row"
                                          justify="space-between"
                                          alignItems="center"
                                          spacing={2}>

                                        <br/>
                                        <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        {this.CardM(this.state.user)}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {this.CardE(this.state.user)}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {this.CardB(this.state.user)}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {this.CardO(this.state.user)}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {this.CardS(this.state.user)}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {this.CardC(this.state.user)}
                                                    </Grid>
                                        </Grid>

                                        </Grid>
                                    <br/>
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


    async sendProduct(price,products) {
        const currentUserId = auth.currentUser.uid

        try {
            const userDoc = await db.collection("users").doc(currentUserId)
            const productCollection = await userDoc.collection('prod').get();
            let existingProductDoc = null;

            productCollection.forEach(doc => {
                if (doc.data().product === products) {
                    existingProductDoc = doc;
                }
            })

            if(existingProductDoc !== null){
                await userDoc.collection('prod').doc(existingProductDoc.id).update({amount: firebase.firestore.FieldValue.increment(+1)})
                alert("המוצר התווסף לסל")

                return;
            }
            const newRequestPurchase = await userDoc.collection("prod").doc();
            await newRequestPurchase.set({
                price: price,
                product: products,
                amount:1,

            })
            alert("המוצר התווסף לסל")

        } catch (error) {
            console.log(error)
        }
    }
    CardM(user) {
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
                        <button id="AddProduct" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: חלב 3%'
                            this.state.price='מחיר: 5 ש"ח'
                            this.sendProduct(this.state.price,this.state.products)
                        }}>הוספה לסל
                        </button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    CardE(user) {
        return (
            <div className="Card"  dir="rtl">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <b> שם מוצר: ביצים אורגניות</b>  <br/>
                        <b>מחיר: 18 ש"ח</b><br/>
                        <img
                            style={{margin: "0 auto", maxHeight: "150px"}}
                            src={egg} className="img-fluid d-block"/>
                    </Grid>

                    <Grid item xs={6}>
                        <button id="AddProduct" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: ביצים אורגניות'
                            this.state.price='מחיר: 18 ש"ח'
                            this.sendProduct(this.state.price,this.state.products)
                        }}>הוספה לסל
                        </button>
                    </Grid>
                </Grid>
            </div>
        );
    }
    CardB(user) {
        return (
            <div className="Card"  dir="rtl">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <b> שם מוצר: לחם פרוס</b>  <br/>
                        <b>מחיר: 9 ש"ח</b><br/>
                        <img
                            style={{margin: "0 auto", maxHeight: "150px"}}
                            src={bread} className="img-fluid d-block"/>
                    </Grid>

                    <Grid item xs={6}>
                        <button id="AddProduct" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: לחם פרוס'
                            this.state.price='מחיר: 9 ש"ח'
                            this.sendProduct(this.state.price,this.state.products)
                        }}>הוספה לסל
                        </button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    CardO(user) {
        return (
            <div className="Card"  dir="rtl">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <b> שם מוצר: שמן קנולה</b>  <br/>
                        <b>מחיר: 7 ש"ח</b><br/>
                        <img
                            style={{margin: "0 auto", maxHeight: "150px"}}
                            src={oil} className="img-fluid d-block"/>
                    </Grid>

                    <Grid item xs={6}>
                        <button id="AddProduct" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: שמן קנולה'
                            this.state.price='מחיר: 7 ש"ח'
                            this.sendProduct(this.state.price,this.state.products)
                        }}>הוספה לסל
                        </button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    CardS(user) {
        return (
            <div className="Card"  dir="rtl">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <b> שם מוצר: סוכר לבן</b>  <br/>
                        <b>מחיר: 5 ש"ח</b><br/>
                        <img
                            style={{margin: "0 auto", maxHeight: "150px"}}
                            src={sugar} className="img-fluid d-block"/>
                    </Grid>

                    <Grid item xs={6}>
                        <button id="AddProduct" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: סוכר לבן'
                            this.state.price='מחיר: 5 ש"ח'
                            this.sendProduct(this.state.price,this.state.products)
                        }}>הוספה לסל
                        </button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    CardC(user) {
        return (
            <div className="Card"  dir="rtl">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <b> שם מוצר: גבינה לבנה</b>  <br/>
                        <b>מחיר: 6 ש"ח</b><br/>
                        <img
                            style={{margin: "0 auto", maxHeight: "150px"}}
                            src={cheese} className="img-fluid d-block"/>
                    </Grid>

                    <Grid item xs={6}>
                        <button id="AddProduct" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: גבינה לבנה'
                            this.state.price='מחיר: 6 ש"ח'// this.save();
                            this.sendProduct(this.state.price,this.state.products)
                        }}>הוספה לסל
                        </button>
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