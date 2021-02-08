import React, { useContext, useEffect, useState } from 'react';
import { ContextProvider } from '../context/Context';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import CallApi from '../utils/CallApi';

function PaginationEmployee(props) {
    const { handlePageChange, filters} = useContext(ContextProvider);
    const [total, setTotal] = useState([])
    const { page } = filters;

    useEffect(() => {
        CallApi(`admin/staffs`, "GET", null)
            .then(res => {
                setTotal([...res.data])
            })
    },[])
    const totalPages = Math.ceil(total.length / 5);
    const dot = [...Array(totalPages).keys()].map(num => num);


    const onChangePage = (newPage) => {
        handlePageChange(newPage)
    }


    return (
        <div className="content__pagination">
            {
                total.length > 5 ? <>
                    <button
                      
                        disabled={page <= 0}
                        onClick={() => onChangePage(page - 1)}>
                        <BsChevronLeft  />
                    </button>

                    {
                         total.length > 5 && dot.map((item, index) => {
                            return (
                                <button
                                    className={page === item ? "activeDot" : ""}
                                 key={index} onClick={() => onChangePage(item)}>{item + 1}</button>
                            )
                        })
                        
                    }
                    <button
                     
                        disabled={page >= totalPages - 1}
                        onClick={() => onChangePage(page + 1)}
                    >
                        <BsChevronRight  />
                    </button>
                </> : null
            }



        </div>
    );
}

export default PaginationEmployee;