const INITIAL_STATE={
    currentPage : 1,
    product : [],
    productPerPage : "",
    totalProduct : "",
    active : 1
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
        default:
            return state
    }
}

export default adminReducer