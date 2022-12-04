import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import st from './../Dialogs.module.css'


const PaginatorModern: React.FC<PaginatedItemsType> = React.memo((props) => {
  let newCurrenPage;
  
  let { total_count } = props;
  const { setCurrentPage } = props;
  const { currentPage } = props;
  const { itemsPerPage } = props;
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(total_count / itemsPerPage));
  }, [itemsPerPage, total_count]);

  const page = (current: any) => {
    setCurrentPage(current.pageNumber.selected + 1);
  };


 (currentPage === 0) ? newCurrenPage = 1 : newCurrenPage = currentPage;

 
  return (
    <>
      <ReactPaginate
        forcePage={newCurrenPage - 1}
        nextLabel=" >"
        onPageChange={(pageNumber) => {
          page({ pageNumber });
        }}
        pageRangeDisplayed={2}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel="< "
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={undefined}

      />
    </>
  );
})

export default PaginatorModern

type PaginatedItemsType = {
  total_count: number
  itemsPerPage: number
  setCurrentPage: (num: number) => void
  currentPage: number
}