import React, { useContext, useState, useRef } from 'react';
import { FiSearch, FiEdit } from 'react-icons/fi';
import { GoPlusSmall } from 'react-icons/go';
import { AiOutlineDelete } from 'react-icons/ai';
import EmployeeModal from './EmployeeModal';
import { ContextProvider } from '../context/Context';
import HeadingTitleContent from './HeadingTitleContent';
import moment from 'moment';
import PaginationEmployee from './PaginationEmployee';


function EmployeeManager(props) {
    const { handleToggleShowModal, employee, handleDeleteEmployee, handleEditEmployee, handleSearch } = useContext(ContextProvider);

    const [search, setSearch] = useState("")

    const typingTimeoutRef = useRef(null);

    const handleChangeSearch = (e) => {
        const value = e.target.value;

        setSearch(value)
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(() => {
            const formValue = {
                search: value
            }
            handleSearch(formValue)
        }, 300)
    }
    const rederEmployee = () => {
        let result;
        if (employee.length > 0) {
            result = employee.map((item, index) => {
                return (
                    <div key={index} className="content__employee-thead active-thead">
                        <div className="content__employee-theadItem active-theadItem col-item-1  ">
                            <h3>{index + 1}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-2 ">
                            <h2><img src={item.avatar} alt="" /> {item.name} </h2>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-3 ">
                            <h3>{item.phone}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem  col-item-4 ">
                            <h3>{item.email}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem  col-item-5 ">
                            <h3>{item.address}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-6 ">
                            <h3>{moment(parseInt(item.birthday)).format("DD-MM-YYYY")}  </h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-7 ">
                            <h3>{item.position}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-8 ">
                            <span onClick={() => handleEditEmployee(item)}><FiEdit size={20} /></span>
                            <span onClick={() => handleDeleteEmployee(item.userId)}><AiOutlineDelete size={23} /></span>
                        </div>
                    </div>
                )
            })
        }
        return result
    }
    return (
        <>
            <div className="content__employee">
                <EmployeeModal />
                <HeadingTitleContent>Quản lý Nhân Viên </HeadingTitleContent>
                <div className="content__employee-head">
                    <div className=" content__employee-box content__employee-container">
                        <form className="content__employee-search col-lg-3 col-md-6">
                            <input value={search} onChange={handleChangeSearch} type="text" placeholder="Seacrh employee..." />
                            <FiSearch size={20} className="search-icon" />
                        </form>
                        <div className="content__employee-add col-lg-9 col-md-6">
                            <button onClick={handleToggleShowModal}>
                                <GoPlusSmall size={25} />
                                <span>Thêm Mới</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="content__employee-table">
                    <div className="content__employee-container">
                        <div className="content__employee-thead">
                            <div className="content__employee-theadItem col-item-1 ">
                                <h3>STT</h3>
                            </div>
                            <div className="content__employee-theadItem col-item-2 " >
                                <h3>Tên nhân viên </h3>
                            </div>
                            <div className="content__employee-theadItem col-item-3 ">
                                <h3>Số điện thoại</h3>
                            </div>
                            <div className="content__employee-theadItem col-item-4 ">
                                <h3>Email</h3>
                            </div>
                            <div className="content__employee-theadItem col-item-5 ">
                                <h3>Địa chỉ</h3>
                            </div>
                            <div className="content__employee-theadItem col-item-6 ">
                                <h3>Ngày sinh</h3>
                            </div>
                            <div className="content__employee-theadItem col-item-7 ">
                                <h3>Vị trí</h3>
                            </div>
                            <div className="content__employee-theadItem col-item-8 ">
                                <h3>Thao tác</h3>
                            </div>
                        </div>
                        <div className="content__employee-tbody">
                            {
                                rederEmployee()
                            }
                        </div>
                        <div className="content__employee-tfoot">
                            <PaginationEmployee></PaginationEmployee>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default EmployeeManager;