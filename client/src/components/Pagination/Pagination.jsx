import React from 'react';
import s from './pagination.module.css'

export default function Pagination({ dogsPerPage, allDogs, pagination, page }) {
    const pages = [];

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pages.push(i)
    }

    const getFirstPage = () => {
        pagination(pages[0])
    }

    const getLastPage = () => {
        pagination(pages[pages.length - 1])
    }

    const getPreviousPage = () => {
        pagination(page - 1 > 0 ? page - 1 : 1);
        window.scrollTo({ top: 0 });
    }

    const getNextPage = () => {
        pagination((page + 1 <= pages.length) ? page + 1 : pages.length);
        window.scrollTo({ top: 0 });
    }

    return (
        <div className={s.pagination}>
            <div className={page === 1 ? s.hidden : s.next_butt}>
            <div className={s.darrow2}>
                <i onClick={getFirstPage} className="fa-sharp fa-solid fa-angles-left"></i>
                </div>
                <div className={s.sarrow2}>
                <i onClick={getPreviousPage} className="fa-sharp fa-solid fa-angle-left"></i>
                </div>
           </div>
            {
                pages?.map((pageNumber) => {
                    return (
                      <div
                        key={pageNumber}
                        className={page !== pageNumber ? s.numbercontainer : s.activenumber}
                        onClick={() => pagination(pageNumber)}
                      >
                        {pageNumber}
                      </div>
                    );
                  })
            }
            <div className={page === pages.length ? s.hidden : s.next_butt}>
                <div className={s.sarrow}>
                <i className={s.singlearrow} onClick={getNextPage} class="fa-sharp fa-solid fa-angle-right"></i>
                </div>
                <div className={s.darrow}>
                <i className={s.doublearrow} onClick={getLastPage} class="fa-sharp fa-solid fa-angles-right"></i>
                </div>
            </div>
        </div>
    )
}	