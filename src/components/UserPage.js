import React from "react";
import {auth, getUser} from '../firebase/firebase'
import {Button} from "@material-ui/core";





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
                    {!this.state.user.email ? (null) : (
                        <div>
                            {this.userPage()}


                            <button onClick={() => this.loadUser("Products")}>Enter Products</button>

                            <button onClick={() => this.loadPage(true)}>loading page</button>
                            <button onClick={() => this.loadPage(false)}>unloading page</button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={this.logout}>
                                התנתק
                            </Button>

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