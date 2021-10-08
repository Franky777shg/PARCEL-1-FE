const INITIAL_STATE={
    currentPage : 1,
    product : [],
    productPerPage : "",
    totalProduct : "",
    active : 1,
    modal : [false, ""]
}

const adminReducer =(state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'PAGINATION':
            return{
                ...state,
                currentPage : action.payload[1].current,
                product : action.payload[0],
                productPerPage : action.payload[2].perpage,
                totalProduct : action.payload[3].totalItems,
                active : action.payload[1].current

            }
        case 'DELETE_PRODUCT' :
            return{
                ...state,
                currentPage : action.payload[1].current,
                product : action.payload[0],
                productPerPage : action.payload[2].perpage,
                totalProduct : action.payload[3].totalItems,
                active : action.payload[1].current,
                modal : [true, action.payload[4].caption]
            }
        case 'RETURN_MODAL':
            return{
                ...state,
                modal : [false, ""]
            }
        default:
            return state
    }
}

export default adminReducer