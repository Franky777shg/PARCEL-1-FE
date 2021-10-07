import axios from "axios";

const URL_API = 'http://localhost:2000/productAdmin/getProductPerPage'

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