import React from "react"

class Pagination extends React.Component{
    render(){

        //5  152  1  2 0 1
        const {productPerPage, totalProduct, paginate, nextPage, prevPage, active }= this.props

        const pageNumber=[]

        //152/5 
        for(let i=1; i<=Math.ceil(totalProduct/productPerPage);i++){
            pageNumber.push(i)
        }

        return(
            <nav>
                <ul className="pagination justify-content-center flex-wrap">
                    <li className={`page-item ${active=== 1 ? "disabled" : ""}`}>
                        <a className="page-link" href={null} onClick={()=>prevPage()}>Sebelumnya</a>
                    </li>
                    {pageNumber.map(item =>(
                        <li key={item} className={`page-item ${active===item ? "active" : ""}`}>
                            <a className="page-link" href={null}  onClick={()=>paginate(item)}>{item}</a>
                        </li>
                    ))}
                    <li className={`page-item ${active===Math.ceil(totalProduct/productPerPage) ? "disabled" : ""}`}>
                        <a className="page-link" href={null}  onClick={()=>nextPage()}>Berikutnya</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination