import React, { Component } from 'react'

export default class HomeView extends Component {
    render() {
        return (
            <>
                <div className="homeView">
                    <img className="home-logo" src={process.env.PUBLIC_URL + 'logo192.png'} alt="Logo"/>
                    <h1>Welcome! to Shopaper.</h1>
                    <button className="ui black button" onClick={()=> this.props.toggleModal('addShoppingList')}>Create Shoping List</button>
                </div>
            </>
        )
    }
}
