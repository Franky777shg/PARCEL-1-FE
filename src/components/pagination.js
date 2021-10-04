import React from "react"

class Pagination extends React.Component{
    render(){
        const {productPerPage, totalProduct, paginate, nextPage, prevPage, active}= this.props

        const pageNumber=[]
        for(let i=1; i<=Math.ceil(totalProduct/productPerPage);i++){
            pageNumber.push(i)
        }

        return(
            <nav>
                <ul className="pagination justify-content-center flex-wrap">
                    <li className={`page-item ${active==="prev" ? "active" : ""}`}>
                        <a className="page-link" href="#product" onClick={()=>prevPage()}>Sebelumnya</a>
                    </li>
                    {pageNumber.map(item =>(
                        <li key={item} className={`page-item ${active===item ? "active" : ""}`}>
                            <a className="page-link" href="#product" onClick={()=>paginate(item)}>{item}</a>
                        </li>
                    ))}
                    <li className={`page-item ${active==="next" ? "active" : ""}`}>
                        <a className="page-link" href="#product" onClick={()=>nextPage()}>Berikutnya</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination