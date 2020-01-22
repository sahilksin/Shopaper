import React, { Component } from 'react'

import utils from '../Utils'

export default class AddItemToList extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            shoppingListName: '',
            empty: false,
            loading: false,
            currentShoppingList: this.props.currentShoppingList
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                data: this.props.data
            })
        }
    }
    // item to shopping list in index db
    addShoppingList = () => {
        if (this.state.shoppingListName) {
            this.setState({
                loading: true
            })
            let shopping = this.props.data[this.props.currentShoppingList]
            shopping.items = [
                ...shopping.items,
                {
                    name: this.state.shoppingListName,
                    status: false
                }
            ]
            utils.add_new('key', {
                ...this.props.data,
                [this.state.currentShoppingList]: shopping
            })
            setTimeout(()=> {
                this.props.toggleModal('addItemToList') 
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
                <div id="addShoppingList-modal" className="modal" onClick={(e)=> (e.target.id === 'addShoppingList-modal')?this.props.toggleModal('addItemToList'): null}>
                    <div className="container">
                        <h4>Add items to shopping this list</h4>
                        {/* <div style={{marginBottom: '10px'}} className="over-flow">
                            <button class="circular mini ui primary icon button">
                                Hello World 123
                            </button>
                        </div> */}
                        <div style={{width: '100%'}} class={`ui left icon ${(this.state.empty)?'error':''} input`}>
                            <input type="text" className="custom-input" value={this.state.shoppingListName} placeholder="Enter items name" onChange={(e) => this.setState({shoppingListName: e.target.value})}/>
                            <i class="shopping bag icon"></i>
                        </div>
                        <div className="footer-button">
                            <button class="ui button" onClick={()=> this.props.toggleModal('addItemToList')}>
                                Close
                            </button>
                            <button class={`ui primary button ${(this.state.loading)?'loading disabled': ''}`} onClick={() => this.addShoppingList()}>
                                Add to list
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
