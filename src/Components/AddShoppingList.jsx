import React, { Component } from 'react'
import utils from './../Utils/'
export default class AddShoppingList extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            shoppingListName: '',
            empty: false,
            loading: false
        }
    }
    // item to shopping list in index db
    addShoppingList = () => {
        if (this.state.shoppingListName) {
            this.setState({
                loading: true
            })
            utils.add_new('key', {
                [this.state.shoppingListName]: {
                    dateCreate: new Date().getTime(),
                    items: []
                }
            })
            setTimeout(()=> {
                this.props.toggleModal('addShoppingList') 
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
                <div id="addShoppingList-modal" className="modal" onClick={(e)=> (e.target.id === 'addShoppingList-modal')?this.props.toggleModal('addShoppingList'): null}>
                    <div className="container">
                        <h4>Create your shopping list</h4>
                        <div style={{width: '100%'}} class={`ui left icon ${(this.state.empty)?'error':''} input`}>
                            <input type="text" className="custom-input" value={this.state.shoppingListName} placeholder="Enter shopping list name" onChange={(e) => this.setState({shoppingListName: e.target.value})}/>
                            <i class="shopping bag icon"></i>
                        </div>
                        <div className="footer-button">
                            <button class="ui button" onClick={()=> this.props.toggleModal('addShoppingList')}>
                                Close
                            </button>
                            <button class={`ui primary button ${(this.state.loading)?'loading disabled': ''}`} onClick={() => this.addShoppingList()}>
                                Create 
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
