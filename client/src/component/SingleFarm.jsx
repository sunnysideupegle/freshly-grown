import React, { Component } from 'react'
import axios from 'axios'
import MapSingleProduct from './MapSingleProduct'
import { Redirect, Link } from 'react-router-dom' 

export default class SingleFarm extends Component {
    state = {
            farmId: '',
            name: '',
            description: '',
            location: '',
            farm_pic_url: '',
            products: [],
        
        newProduct: {
            name: '',
            description: '',
            price: '',
            unit: '',
            total_quantity: '',
            product_pic_url: '',
            tag: '',
            farm: this.props.match.params.farmId
        },
        redirect: false,
    }
    componentDidMount() {
        const farmId = this.props.match.params.farmId
        axios.get(`/api/v1/farm/${farmId}`)
            .then((res) => {
                console.log(res.data)
                this.setState(res.data)
            })
    }

    refreshSingleFarm = () => {
        const farmId = this.props.match.params.farmId
        axios.get(`/api/v1/farm/${farmId}`)
        .then((res) => {
            console.log(res.data)
            this.setState({changeFarm: res.data})
        })
    }
  
    onFarmDeleteClick = () => {
        const farmId = this.props.match.params.farmId
        axios.delete(`/api/v1/farm/${farmId}/`)
        .then(() => {
            this.setState({redirect : true})
        })  
    }
    createNewProduct = (event) => {
        event.preventDefault()
        // const newProduct = {
        // }
        // Object.entries(this.state.newProduct).forEach(([key, value]) => {
        //     if(value === '') {
        //         newProduct[key] = value
        //     }
        // });
        console.log('newProduct', this.state.newProduct)
        axios.post('/api/v1/product/', this.state.newProduct)
        .then(() => {
            this.refreshSingleFarm()
        })
    }

    onCreateProductForm = (event) => {
        const previousState = { ...this.state.newProduct }
        previousState[event.target.name] = event.target.value
        this.setState({newProduct: previousState})
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/farm" />
        }
        return (
            <div>
                <button><Link to={`/farm/edit/${this.props.match.params.farmId}`}>Edit Farm</Link></button>
                <button onClick={() => this.onFarmDeleteClick()}>Delete Farm</button>


                <h1>{this.state.name}</h1>
                <h1>{this.state.description}</h1>
                <h2>{this.state.location}</h2>
                <img src={this.state.farm_pic_url} width="200"/>
                <MapSingleProduct
                        farm={this.state}
                        refreshSingleFarm = {this.refreshSingleFarm}
                    />
                <h1>Add New Product</h1>
                <form>
                <input
                        type="string"
                        placeholder="Product Name"
                        id="name"
                        value={this.state.newProduct.name}
                        name="name"
                        onChange={this.onCreateProductForm}
                    /> 
                <input
                        type="string"
                        placeholder="Description"
                        id="description"
                        value={this.state.newProduct.description}
                        name="description"
                        onChange={this.onCreateProductForm}
                    /> 
                <input
                        type="string"
                        placeholder="Price"
                        id="price"
                        value={this.state.newProduct.price}
                        name="price"
                        onChange={this.onCreateProductForm}
                    />
                <input
                        type="string"
                        placeholder="Units"
                        id="unit"
                        value={this.state.newProduct.unit}
                        name="unit"
                        onChange={this.onCreateProductForm}
                    /> 
                <input
                        type="string"
                        placeholder="Total Quantity"
                        id="totalQuantity"
                        value={this.state.newProduct.total_quantity}
                        name="total_quantity"
                        onChange={this.onCreateProductForm}
                    /> 
                <input
                        type="string"
                        placeholder="Product Pic Url"
                        id="productPicUrl"
                        value={this.state.newProduct.product_pic_url}
                        name="product_pic_url"
                        onChange={this.onCreateProductForm}
                    />
                <input
                        type="string"
                        placeholder="Tag"
                        id="tag"
                        value={this.state.newProduct.tag}
                        name="tag"
                        onChange={this.onCreateProductForm}
                    />
                <input
                        type="string"
                        placeholder="FarmId"
                        id="farmId"
                        value={this.props.match.params.farmId}
                        name="farm"
                        onChange={this.onCreateProductForm}
                    />
                <input
                        type="submit"
                        value="Create New Product"
                        onClick={this.createNewProduct}
                    />
                </form>
               

            </div>
        )
    }
}