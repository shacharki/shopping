import React from "react";
import {auth, db, getProduct, getUser} from '../firebase/firebase'
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import './UserPage.css'
import CardMedia from '@material-ui/core/CardMedia';
import milk from '../layout/images/milk.jpg';
import egg from '../layout/images/egg.jpg';
import bread from '../layout/images/bread.jpg';
import oil from '../layout/images/oil.jpg';
import sugar from '../layout/images/sugar.jpg';
import cheese from '../layout/images/cheese.jpg';




function Card1({product}) {
    if (this.state.products==product.product){
        return 1
    }
    return 0;

}
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
                imgUrl:"",
                sum:"",
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
                <div className="sec-design">
                    {this.userPage()}
                    <button id="mngRequestPurchase" className="btn btn-info" onClick={() => {
                        NextPage(this.props, "ShoppingCart", this.state.user)
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
                                                    {this.CardM(this.state.user)}
                                                    {this.CardE(this.state.user)}
                                                    {this.CardB(this.state.user)}
                                                    {this.CardO(this.state.user)}
                                                    {this.CardS(this.state.user)}
                                                    {this.CardC(this.state.user)}

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


    async sendProduct(price,products,img,photo) {
        var path = auth.currentUser.uid

        try {
            var product = await db.collection("users").doc(path)
            var newRequestPurchase = await product.collection("prod").doc();

            // if(newRequestPurchase.prod.product==products)
            {
                console.log("11111111111")
            }
            await newRequestPurchase.set({
                price: price,
                product: products,
                image:img,
                sum:1,

            })

            window.location.reload(true);
        } catch (error) {
            this.loadSpinner(false)
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
                        <button id="mngRequestPurchase" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: חלב 3%'
                            this.state.price='מחיר: 5 ש"ח'
                            this.state.imgUrl="https://drive.google.com/file/d/1vT72F_J_POo0a9DMWdC38Fn-4MtiFbmy/view?usp=sharing"
                            // this.save();
                            this.sendProduct(this.state.price,this.state.products,this.state.imgUrl,milk)
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
                        <button id="mngRequestPurchase" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: ביצים אורגניות'
                            this.state.price='מחיר: 18 ש"ח'
                            this.state.imgUrl="https://drive.google.com/file/d/1I1l2rqDPo1Q5yiTgDmznRjwoIS6gVnAj/view?usp=sharing"
                            // this.save();
                            this.sendProduct(this.state.price,this.state.products,this.state.imgUrl)
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
                        <button id="mngRequestPurchase" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: לחם פרוס'
                            this.state.price='מחיר: 9 ש"ח'
                            this.state.imgUrl="https://drive.google.com/file/d/1mvVM26CnsQGcpXaHvfXUe6EV-3mDrpKo/view?usp=sharing"
                            // this.save();
                            this.sendProduct(this.state.price,this.state.products,this.state.imgUrl)
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
                        <button id="mngRequestPurchase" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: שמן קנולה'
                            this.state.price='מחיר: 7 ש"ח'
                            this.state.imgUrl="https://drive.google.com/file/d/1fkMhjg6Ee3CrNMpdFCf7i7XnReKVhpUd/view?usp=sharing"
                            // this.save();
                            this.sendProduct(this.state.price,this.state.products,this.state.imgUrl)
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
                        <button id="mngRequestPurchase" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: סוכר לבן'
                            this.state.price='מחיר: 5 ש"ח'
                            this.state.imgUrl="https://drive.google.com/file/d/1KCo8MqOzQ8b7Hmgoc2cQpAA8aWL3i1Ff/view?usp=sharing"
                            // this.save();
                            this.sendProduct(this.state.price,this.state.products,this.state.imgUrl)
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
                        <button id="mngRequestPurchase" className="btn btn-info" onClick={async () => {
                            this.state.products='שם מוצר: גבינה לבנה'
                            this.state.price='מחיר: 6 ש"ח'
                            this.state.imgUrl="https://drive.google.com/file/d/1p5Yg1Zp0jwaZ0xTupmRzGuvEgfbPhldB/view?usp=sharing"
                            // this.save();
                            this.sendProduct(this.state.price,this.state.products,this.state.imgUrl)
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