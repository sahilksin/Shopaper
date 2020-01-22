import React, { Component } from 'react'
import utils from '../Utils'
export default class ShoppingListDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            shoppingListData: this.props.shoppingListData
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
        data[this.state.shoppingListData.item].items.splice(index, 1)
        delete ele.parentNode.parentNode

        utils.add_new('key', {
            ...data,
        })
        setTimeout(()=> {
            ele.className = ele.className.replace(' loading disabled', '')
            this.props.getData()
        }, 1000)
    }
    toggleItemStatus = (item, index) => {
        let animateBack = document.getElementById('animatable'+index)
        let nameText = document.getElementById('strikeName'+index)
        let deleteBack = document.getElementById('delete_shop_list-'+index)
        let deleteText = document.getElementById('changeColor'+index)
        let input = document.getElementById('input'+index)
        if (!item.status) {
            let data = this.state.data
            let temp = []
            data[this.state.shoppingListData.item].items.map((ele) =>{
                if (ele.name === item.name) {
                    temp.push({
                        name: item.name,
                        status: true
                    })
                } else {
                    temp.push(ele)
                }
            })
            data[this.state.shoppingListData.item].items = temp
            utils.add_new('key', {
                ...data,
            })
            setTimeout(()=> {
                this.props.getData()
                animateBack.className = animateBack.className+' full-width'
                nameText.className = nameText.className+' whiteColor strike'
                deleteBack.className = deleteBack.className+' whiteBG'
                deleteText.className = deleteText.className+' primaryColor'
            }, 1000)
        } else {
            let data = this.state.data
            let temp = []
            data[this.state.shoppingListData.item].items.map((ele) =>{
                if (ele.name === item.name) {
                    temp.push({
                        name: item.name,
                        status: false
                    })
                } else {
                    temp.push(ele)
                }
            })
            data[this.state.shoppingListData.item].items = temp
            utils.add_new('key', {
                ...data,
            })
            setTimeout(()=> {
                this.props.getData()
                animateBack.className = animateBack.className.replace(' full-width', '')
                nameText.className = nameText.className.replace(' whiteColor strike', '')
                deleteBack.className = deleteBack.className.replace(' whiteBG', '')
                deleteText.className = deleteText.className.replace(' primaryColor', '')
            }, 1000)
        }
    }
    render() {
        return (
            <>
                <div className="shoppingListView">
                    <div className="head">
                        <img src={process.env.PUBLIC_URL+'logo64.png'} alt="Logo"/>
                        <h2 style={{margin: '0px'}} className="pointer" onClick={() => this.props.viewShoppingList(false, null, {})}><i class="times icon"></i></h2>
                    </div>
                    <div style={{marginTop: '40px'}} className="body-content">
                        <div className="header-button" style={{marginBottom: '25px'}}>
                            <h3 style={{margin: '0px', color: 'rgba(14, 92, 34, 100%)'}}>{this.state.shoppingListData.item}</h3>
                            <button className="ui basic button primary" onClick={()=>this.props.toggleModal('addItemToList', this.state.shoppingListData.item)}>Add Item</button>
                        </div>
                        {
                            this.state.data[this.state.shoppingListData.item].items.map((item, index) => {
                                return (
                                    <div key={index} className="shoppingList pointer">
                                        <div id={"animatable"+index} className={`animatable-back ${(item.status)?' full-width':''}`}></div>
                                        <div className="left-details">
                                            <div className="serial-no">
                                                <div class="ui primary fitted checkbox">
                                                    <input type="checkbox" id={"input"+index} checked={item.status} onChange={(e)=> this.toggleItemStatus(item, index, e)}/>
                                                    <label></label>
                                                </div>
                                            </div>
                                            <div className="name-date-shop-list">
                                                <p style={{marginBottom: '0px'}} className={`${(item.status)?' whiteColor strike':''}`} id={"strikeName"+index}>{item.name}</p>
                                            </div>
                                        </div>
                                        <div className="right-actions">
                                            <button id={`delete_shop_list-${index}`} onClick={() => this.deleteItem(item, index)} className={`ui primary compact icon button ${(item.status)?' whiteBG':''}`}>
                                                <i id={"changeColor"+index} className={`trash alternate icon ${(item.status)?' primaryColor':''}`}></i>
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
