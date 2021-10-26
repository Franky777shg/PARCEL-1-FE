import React from "react";

class Pagination extends React.Component {
  render() {
    //5  152  1  2 0 1
    const {
      productPerPage,
      totalProduct,
      paginate,
      nextPage,
      prevPage,
      active,
    } = this.props;

    const pageNumber = [];

    //152/5
    for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
      pageNumber.push(i);
    }

    return (
      <nav>
        <ul className="pagination justify-content-center flex-wrap">
          <li className={`page-item ${active === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => prevPage()}
              style={{ backgroundColor: "#7792A8", color: "white" }}
            >
              Sebelumnya
            </button>
          </li>
          {pageNumber.map((item) => (
            <li
              key={item}
              className={`page-item ${active === item ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => paginate(item)}
                style={{ backgroundColor: "#7792A8", color: "white" }}
              >
                {item}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              active === Math.ceil(totalProduct / productPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => nextPage()}
              style={{ backgroundColor: "#7792A8", color: "white" }}
            >
              Berikutnya
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
