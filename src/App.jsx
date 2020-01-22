import React, { Component } from 'react'
import HomeView from './Components/HomeView'
import ShoppingListView from './Components/ShoppingListView'
import AddShoppingList from './Components/AddShoppingList'
import UpdateShoppingList from './Components/UpdateShoppingList'
import ShoppingListDetails from './Components/ShoppingListDetails'
import AddItemToList from './Components/AddItemToList'
import utils from './Utils/'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: {
        addShoppingList: false,
        updateShoppingList: false,
        addItemToList: false,
      },
      updateShoppingListName: '',
      currentShoppingList: '',
      data: null,
      viewShoppingList: {
        show: false,
        data: {},
        item: null
      }
    }
  }

  componentDidMount() {
    this.getData()
  }

  // toggle all modals
  toggleModal = (modalType, data) => {
    if (modalType === 'updateShoppingList') {
      if (data) {
        this.setState({
          updateShoppingListName: data,
        })
      }
    }
    if (modalType === 'addItemToList') {
      if (data) {
        this.setState({
          currentShoppingList: data,
        })
      }
    }
    this.setState({
      modal: {
        ...this.state.modal,
        [modalType]: !this.state.modal[modalType]
      }
    })
  }

  // get data from index db 
  getData = () => {
    utils.fetchData('key')
    .then(res => {
      delete res['key']
      this.setState({
        data: res
      })
    })
  }

  viewShoppingList = (showStatus, item, data) => {
    this.setState({
      viewShoppingList: {
        show: showStatus,
        data,
        item
      }
    })
  }
  render() {
    return (
      <>
        {
          (!this.state.data)
            ? <></>
            : (!(Object.keys(this.state.data).length > 0))
              ? <HomeView toggleModal={this.toggleModal}/>
              : (this.state.viewShoppingList.show)
                  ? <ShoppingListDetails data={this.state.data} getData={this.getData} toggleModal={this.toggleModal} shoppingListData={this.state.viewShoppingList} viewShoppingList={this.viewShoppingList}/>
                  : <ShoppingListView data={this.state.data} viewShoppingList={this.viewShoppingList} getData={this.getData} toggleModal={this.toggleModal}/>
        }
        {
          (this.state.modal.addShoppingList)
            ? <AddShoppingList toggleModal={this.toggleModal} getData={this.getData}/>
            : <></>
        }
        {
          (this.state.modal.updateShoppingList)
            ? <UpdateShoppingList data={this.state.data} listName={this.state.updateShoppingListName} toggleModal={this.toggleModal} getData={this.getData}/>
            : <></>
        }
        {
          (this.state.modal.addItemToList)
            ? <AddItemToList toggleModal={this.toggleModal} currentShoppingList={this.state.currentShoppingList} data={this.state.data} getData={this.getData}/>
            : <></>
        }
      </>
    )
  }
}

export default App