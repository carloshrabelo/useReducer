import React from "react";
import PropTypes from "prop-types";

export const Pagination = ({ page, pages, onPaginate, ...props }) => {
  const _pages = [...Array(pages).keys()].map((i) => i + 1);
  return (
    <nav {...props}>
      <ul className="pagination justify-content-center" role="group">
        <li
          className="page-item"
          disabled={1 === page}
          onClick={() => onPaginate(1)}
        >
          <button role="menuitem" className="page-link">
            <span role="img" aria-label="First">
              👈
            </span>
          </button>
        </li>
        {_pages.map((index) => (
          <li
            className={`page-item ${index !== page ? "" : "active"}`}
            key={index}
            onClick={() => onPaginate(index)}
          >
            <button role="menuitem" className="page-link">
              {index}
            </button>
          </li>
        ))}
        <li
          className="page-item"
          disabled={pages === page}
          onClick={() => onPaginate(pages)}
        >
          <button role="menuitem" className="page-link">
            <span role="img" aria-label="Last">
              👉
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  onPaginate: PropTypes.func,
};
export default Pagination;
