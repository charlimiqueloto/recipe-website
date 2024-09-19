import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <section className="controls">
      <div className="pagination">
        <button className="btnx"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Back
        </button>
        <span className="page-count">{`Page ${currentPage} of ${totalPages}`}</span>
        <button className="btnx"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
