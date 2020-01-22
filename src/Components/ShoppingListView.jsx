import React, { Component } from 'react'
import utils from './../Utils'
export default class ShoppingListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                data: this.props.data
            })
        }
    }

    editItem = (item) => {
        this.props.toggleModal('updateShoppingList', item)
    }
    deleteItem = (item, index) => {
        let ele = document.getElementById(`delete_shop_list-${index}`)
        ele.className = ele.className + ' loading disabled'
        let data = this.state.data
        delete data[item]
        utils.deleteTable('key')
        utils.add_new('key', {
            ...data,
        })
        setTimeout(()=> {
            ele.className = ele.className.replace(' loading disabled', '')
            this.props.getData()
        }, 1000)
    }
    render() {
        return (
            <>
                <div className="shoppingListView">
                    <div className="head">
                        <img src={process.env.PUBLIC_URL+'logo64.png'} alt="Logo"/>
                        <button className="ui black button" onClick={()=> this.props.toggleModal('addShoppingList')}>Create Shoping List</button>
                    </div>
                    <div style={{marginTop: '40px'}} className="body-content">
                        {
                            Object.keys(this.state.data).map((item, index) => {
                                return (
                                    <div className="shoppingList pointer">
                                        <div className="left-details" onClick={(e)=> this.props.viewShoppingList(true, item,this.state.data[item])}>
                                            <div className="serial-no">
                                                {index + 1}.
                                            </div>
                                            <div className="name-date-shop-list">
                                                <p style={{marginBottom: '0px'}}>{item}</p>
                                                <span>{utils.time(this.props.data[item].dateCreate)}</span>
                                            </div>
                                        </div>
                                        <div className="right-actions">
                                            <button id={`add_shop_list-${index}`} onClick={()=>this.props.toggleModal('addItemToList', item)} class="ui primary compact icon button">
                                                <i class="plus icon"></i>
                                            </button>
                                            <button id={`edit_shop_list-${index}`} onClick={() => this.editItem(item, index)} class="ui primary compact icon button">
                                                <i class="pencil alternate icon"></i>
                                            </button>
                                            <button id={`delete_shop_list-${index}`} onClick={() => this.deleteItem(item, index)} class="ui primary compact icon button">
                                                <i class="trash alternate icon"></i>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}
