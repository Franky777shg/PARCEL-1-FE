import axios from "axios";

const URL_API = 'http://localhost:2000/productAdmin/getProductPerPage'
const URL_DELETE = 'http://localhost:2000/productAdmin/deleteProduct'
const URL_PARCEL = 'http://localhost:2000/productAdmin/getParcelPerPage'
const URL_DELETE_PARCEL = 'http://localhost:2000/productAdmin/deleteParcel'

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


export const parcelForAdmin=(data)=>{
    return(dispatch)=>{
        axios.get(`${URL_PARCEL}/${data}`)
        .then(res=>{
            return dispatch({
                type : 'PAGINATION_PARCEL',
                payload : res.data
            })
        })
        .catch(err => console.log(err))
    }
}

export const deleteParcel =(data)=>{
    return(dispatch)=>{
        // console.log(data)
        axios.get(`${URL_DELETE_PARCEL}/${data.id}/${data.page}/${data.nama}`)
        .then(res =>{
            // console.log(res.data)
            return dispatch({
                type : 'DELETE_PARCEL',
                payload : res.data
            })
        })
        .catch(err => console.log(err))
    }
}