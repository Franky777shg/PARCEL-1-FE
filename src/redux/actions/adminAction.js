import axios from "axios";

const URL_API = 'https://api-parcel-1.purwadhikafs2.com/productAdmin/getProductPerPage'
const URL_DELETE = 'https://api-parcel-1.purwadhikafs2.com/productAdmin/deleteProduct'
const URL_PARCEL = 'https://api-parcel-1.purwadhikafs2.com/productAdmin/getParcelPerPage'
const URL_DELETE_PARCEL = 'https://api-parcel-1.purwadhikafs2.com/productAdmin/deleteParcel'

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