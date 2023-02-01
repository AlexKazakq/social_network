import React from "react";
import styles from "./Paginator.module.css";


type PaginatorPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = ({pageSize, totalUsersCount, currentPage, onPageChanged}: PaginatorPropsType) => {

    const PAGES_LENGTH = 11;
    const totalPagesCount = Math.ceil(totalUsersCount / pageSize);
    const pagesCount = totalPagesCount < PAGES_LENGTH ? totalPagesCount : PAGES_LENGTH;
    const half = Math.floor(pagesCount / 2);
    let startPage = currentPage - half;
    if (startPage < 1) startPage = 1;
    if ((startPage + pagesCount) > totalPagesCount) startPage = totalPagesCount - pagesCount;

    const pages = [];
    for (let i = startPage; i < startPage + PAGES_LENGTH; i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map(p => <span className={currentPage === p ? styles.selectorPages : ""}
                                  onClick={() => onPageChanged(p)}>{p}</span>)}
        </div>
    );
};

