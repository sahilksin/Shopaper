import React, { Component } from 'react'

import utils from '../Utils'

export default class UpdateShoppingList extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            shoppingListName: this.props.listName,
            empty: false,
            loading: false,
            prevListName: this.props.listName,
        }
    }
    // item to shopping list in index db
    updateShoppingList = () => {
        if (this.state.shoppingListName) {
            this.setState({
                loading: true
            })
            let shopping = this.props.data[this.state.prevListName]
            delete this.props.data[this.state.prevListName]
            utils.deleteTable('key')
            utils.add_new('key', {
                ...this.props.data,
                [this.state.shoppingListName]: shopping
            })
            setTimeout(()=> {
                this.props.toggleModal('updateShoppingList') 
                this.props.getData()
            }, 1000)
        }else{
            this.setState({
                empty: true
            })
        }
    }
    render() {
        return (
            <>
                <div id="updateShoppingList-modal" className="modal" onClick={(e)=> (e.target.id === 'updateShoppingList-modal')?this.props.toggleModal('updateShoppingList'): null}>
                    <div className="container">
                        <h4>Update shopping list</h4>
                        <div style={{width: '100%'}} class={`ui left icon ${(this.state.empty)?'error':''} input`}>
                            <input type="text" className="custom-input" value={this.state.shoppingListName} placeholder="Update shopping list name" onChange={(e) => this.setState({shoppingListName: e.target.value})}/>
                            <i class="shopping bag icon"></i>
                        </div>
                        <div className="footer-button">
                            <button class="ui button" onClick={()=> this.props.toggleModal('updateShoppingList')}>
                                Close
                            </button>
                            <button class={`ui primary button ${(this.state.loading)?'loading disabled': ''}`} onClick={() => this.updateShoppingList()}>
                                Update 
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
