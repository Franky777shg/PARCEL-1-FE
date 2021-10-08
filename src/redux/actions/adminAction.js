import axios from "axios";

const URL_API = 'http://localhost:2000/productAdmin/getProductPerPage'
const URL_DELETE = 'http://localhost:2000/productAdmin/deleteProduct'

export const productForAdmin =(data)=>{
    return(dispatch)=>{
        axios.get(`${URL_API}/${data}`)
        .then(res =>{
            return dispatch({
                type : 'PAGINATION',
                payload : res.data
            })
    
        })
        .catch(err => console.log(err))
    }
}

export const deleteProduct =(data)=>{
    return(dispatch)=>{
        axios.get(`${URL_DELETE}/${data.id}/${data.page}/${data.name}`)
        .then(res=>{
            return dispatch({
                type : 'DELETE_PRODUCT',
                payload : res.data
            })
        })
        .catch(err => console.log(err))
    }
}

export const modalSuccess =()=>{
    return(dispatch)=>{
        dispatch({
            type : 'RETURN_MODAL'
        })
    }
}