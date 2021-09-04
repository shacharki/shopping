import React from "react";
import {auth,db, getUser, getProduct} from '../firebase/firebase'
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import './UserPage.css'


function Card({product}) {
    return (
        <div className="Card"  dir="rtl">
                <Grid item xs={12}>
                    <b>{product.product}</b>  <br/>
                    <b>{product.price}</b><br/>
                    <b>{" כמות: "+product.amount || 1}</b><br/>
                </Grid>

        </div>
    );
}


export function BackPage(prop,data)
{
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


class ShoppingCart extends React.Component {
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
                const type =await getUser(user)
                const productList = await getProduct(user.uid)
                this.setState({
                    isLoad: true,
                    user,
                    type: type,
                    productList
                })
            }
            else {
                this.setState({
                    isLoad: true,
                })
                window.location.href = '/Login';

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

                                        <Grid item xs={12}>
                                            {
                                                this.state.productList.map(product => <Card product={product}/> )
                                            }

                                        </Grid>

                                    </Grid>
                                    <br/>

                                    <Grid item xs={12}>
                                        <button id="product" className="btn btn-info" onClick={() => {
                                            this.BackPage()
                                        }}>חזור
                                        </button>
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

    loadUser(page)
    {
        this.props.history.push({

            pathname: `User/${page}/${this.state.user.uid}`,
            data: this.state.user // your data array of objects
        })
    }

    BackPage()
    {
        this.props.history.push({
            pathname: `/User`,
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
                עגלת הקניות של {user.displayName}
            </div>
        )
    }

}


export  default  ShoppingCart;