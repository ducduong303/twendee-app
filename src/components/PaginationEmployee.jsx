import React, { useContext} from 'react';
import { ContextProvider } from '../context/Context';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

function PaginationEmployee(props) {
    const { handlePageChangeEmpoyee,filtersEmpoyee,totalEmployee} = useContext(ContextProvider);
    const { page } = filtersEmpoyee;
    const totalPages = Math.ceil(totalEmployee.length / 5);  
    const dot = [...Array(totalPages).keys()].map(num => num);

    const onChangePage = (newPage) => {
        handlePageChangeEmpoyee(newPage)
    }


    return (
        <div className="content__pagination">
            {
             totalEmployee.length > 5 ? <>
                    <button
                      
                        disabled={page <= 0}
                        onClick={() => onChangePage(page - 1)}>
                        <BsChevronLeft  />
                    </button>

                    {
                          totalEmployee.length > 5 && dot.map((item, index) => {
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