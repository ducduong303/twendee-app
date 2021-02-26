import React, { useState, useContext } from 'react';
import HeadingTitleContent from './HeadingTitleContent';
import moment from 'moment';
import { FiCheckCircle } from 'react-icons/fi';
import { RiCloseCircleLine } from 'react-icons/ri';
import { AiOutlineDelete, AiFillEye } from 'react-icons/ai';
import classNames from "classnames"
import { Link } from 'react-router-dom';
import { ContextProvider } from '../context/Context';
import PaginationRequest from './PaginationRequest';
function ResquestManagement(props) {
    const {
        requestUser, handleAcceptRequest, handleRefuseRequest, handleDeleteRequest, handleChangeFilterRequest } = useContext(ContextProvider)

    const [inputSelect, setInputSelect] = useState({
        isAccepted: -1,
        type: 0
    })
    const handleChange = (e) => {
        setInputSelect({
            ...inputSelect,
            [e.target.name]: e.target.value
        })

    }
    const handleSearchRequest = () => {
        handleChangeFilterRequest(inputSelect)
    }

    const renderRequest = () => {
        let result;
        if (requestUser.length > 0) {
            result = requestUser.map((item, index) => {
                return (
                    <div key={index} className={classNames("content__employee-thead active-thead")}>
                        <div className="content__employee-theadItem active-theadItem col-item-1  ">
                            <h3>{index + 1}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem  col-item-2 ">
                            <h3>{item.email}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem  col-item-3 ">
                            <h3>{moment((item.timeRequest)).format("DD-MM-YYYY")}  </h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-4 ">
                            <h3>{item.type}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-5 ">
                            <h3>{item.requestId}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-6">
                            {/* <h3></h3> */}
                            <h3>
                                {
                                    item.isAccept === true ? <span className="accept">chấp nhận</span> : item.isAccept === false ?
                                        <span className="refuse">từ chối</span> : item.isAccept === null ? <span className="pending">chưa duyệt</span> : ""
                                }
                            </h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-7 ">
                            <span><Link to={`/admin/quanlydontu/${item.requestId}`}><AiFillEye size={25} /></Link></span>
                            <span><FiCheckCircle size={20} onClick={() => handleAcceptRequest(item.requestId)} /></span>

                            <span><RiCloseCircleLine size={23} onClick={() => handleRefuseRequest(item.requestId)} /></span>
                            <span><AiOutlineDelete size={23} onClick={() => handleDeleteRequest(item.requestId)} /></span>

                        </div>
                    </div>
                )
            })
        } else {
            result = <h3 className="tbody-msg">Hiện tại chưa có request nào !</h3>
        }
        return result;

    }
    return (
        <>
            <HeadingTitleContent>Quản lý đơn từ</HeadingTitleContent>
            <div className="content__employee-head">
                <div className=" content__employee-box content__employee-container">
                    <div className="content__employee-filterRequest">
                        <div className="content__employee-filterRequest-left">
                            <input type="text" placeholder="Search" />
                        </div>
                        <div className="content__employee-filterRequest-rigth">
                            <select value={inputSelect.isAccepted} name="isAccepted" onChange={handleChange} className="content__employee-selected ">
                                <option value={-1}>Trạng Thái</option>
                                <option value={1}>Accept</option>
                                <option value={0}>Refuse</option>
                                <option value={2}>Pending</option>
                            </select>
                            <select value={inputSelect.type} name="type"
                                onChange={handleChange} className="content__employee-selected">
                                <option value={0}>Loại đơn từ </option>
                                <option value={1}>Xin nghỉ </option>
                                <option value={4}>Quên chấm công</option>
                                <option value={3}>Đi sớm về muộn</option>
                                <option value={2}>Onsite</option>
                            </select>
                            <button onClick={handleSearchRequest}>
                                <span>Tìm kiếm</span>
                            </button>
                        </div>


                    </div>

                </div>
            </div>
            <div className="content__employee-table">
                <div className="content__employee-container">
                    <div className="content__employee-thead thead-isShow">
                        <div className="content__employee-theadItem col-item-1">
                            <h3>STT</h3>
                        </div>
                        <div className="content__employee-theadItem col-item-2">
                            <h3>Email</h3>
                        </div>
                        <div className="content__employee-theadItem col-item-3">
                            <h3>Thời gian</h3>
                        </div>
                        <div className="content__employee-theadItem col-item-4">
                            <h3>Loại đơn từ</h3>
                        </div>
                        <div className="content__employee-theadItem col-item-5">
                            <h3>Request-ID</h3>
                        </div>
                        <div className="content__employee-theadItem col-item-6">
                            <h3>Trạng thái</h3>
                        </div>
                        <div className="content__employee-theadItem col-item-7">
                            <h3>Thao tác</h3>
                        </div>
                    </div>
                    <div className="content__employee-tbody">
                        {
                            renderRequest()
                        }
                    </div>
                    <div className="content__employee-tfoot">
                        <PaginationRequest></PaginationRequest>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResquestManagement;