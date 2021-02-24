import React, { useState, useEffect } from 'react';
import HeadingTitleContent from './HeadingTitleContent';
import moment from 'moment';
import { FiCheckCircle } from 'react-icons/fi';
import { RiCloseCircleLine } from 'react-icons/ri';
import { AiOutlineDelete } from 'react-icons/ai';
import CallApi from '../utils/CallApi';
import classNames from "classnames"
import queryString from "query-string";
function ResquestManagement(props) {
    // const { handleChangeSelect} = useContext(ContextProvider)
    const [requestUser,setRequestUser] = useState([])
    const [inputSelect,setInputSelect] = useState({
        isAccepted:"",
        type:""
    })
    const handleChange = (e) =>{
        setInputSelect({
            ...inputSelect,
            [e.target.name]:e.target.value
        })
    }
    const handleSearchRequest = () =>{
        console.log("inputSelect",inputSelect);
        const param = queryString.stringify(inputSelect);
        if(inputSelect.isAccepted === "" && inputSelect.type === ""){
            CallApi(`admin/requests`, "GET", null)
            .then(res => {
                console.log("res",res);
            })
        }else{
            CallApi(`admin/requests?${param}`, "GET", null)
            .then(res => {
                console.log("res",res);
                
            })
        }
       
    }
   
    useEffect(()=>{
        CallApi("admin/requests", "GET", null)
            .then(res => {
                setRequestUser([...res.data])
            })
    },[])
    
    const findIndexRequest = (data, id) => {
        var index = -1;
        data.forEach((item, i) => {
            if (item.requestId === id) {
                index = i
            }
        })
        return index
    }
    const handleDeleteRequest = (id) => {
        if (id) {
            CallApi(`admin/requests/${id}`, "DELETE", null)
                .then(res => {
                    const data = requestUser.filter(item => item.requestId !== id);
                    setRequestUser([...data])
                    alert("Delete thành công")
                })
        }
    }
    const handleAcceptRequest = (id) =>{
        var index = findIndexRequest(requestUser, id);
        var isAccept = requestUser[index].isAccept;
        if (isAccept === null) {
            CallApi(`admin/accept/${id}`, "GET", null)
                .then(res => {
                    if(res.data.mess){
                        alert("Accept thành công")
                    }
                })
                requestUser[index] = {
                    ...requestUser[index],
                    isAccept: true
                }
                setRequestUser([...requestUser])
        } else {
            alert("đã phê duyệt")
        }
    }
    const  handleRefuseRequest = (id) =>{
        var index = findIndexRequest(requestUser, id);
        var isAccept = requestUser[index].isAccept;
        if (isAccept === null) {
            CallApi(`admin/refuse/${id}`, "GET", null)
                .then(res => {
                    if(res.data.mess){
                        alert("Refuse thành công")
                    }
                })
                requestUser[index] = {
                    ...requestUser[index],
                    isAccept: false
                }
                setRequestUser([...requestUser])
        } else {
            alert("đã phê duyệt")
        }
    }

    const renderRequest = () => {
        let result;
        if (requestUser.length > 0) {
            result = requestUser.map((item, index) => {
                return (
                    <div key={index} className={classNames("content__employee-thead active-thead", {requestAccept:item.isAccept} ,{requestRefuse:item.isAccept === false})}>
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
                        <div className="content__employee-theadItem active-theadItem col-item-6 ">
                            <span><FiCheckCircle size={20} onClick={() => handleAcceptRequest(item.requestId)} /></span>
                            <span><RiCloseCircleLine size={23} onClick={() => handleRefuseRequest(item.requestId)} /></span>
                            <span><AiOutlineDelete size={23} onClick={() => handleDeleteRequest(item.requestId)} /></span>

                        </div>
                    </div>
                )
            })
        }else{
            result = <h3 className="tbody-msg">Hiện tại chưa có request nào !</h3>
        }
        return result;

    }
    return (
        <>
            <HeadingTitleContent>Quản lý đơn từ</HeadingTitleContent>
            <div className="content__employee-head">
                    <div className=" content__employee-box content__employee-container">
                        <select value={inputSelect.isAccepted} name="isAccepted" onChange={handleChange} className="content__employee-selected col-lg-2 col-md-6">
                            <option value="">All</option>
                            <option value={true}>Accept</option>
                            <option value={false}>Refuse</option>
                        </select>
                        <select value={inputSelect.type} name="type" onChange={handleChange} className="content__employee-selected col-lg-2 col-md-6">
                            <option value="">Loại đơn từ </option>
                            <option value={1}>Xin nghỉ </option>
                            <option value={4}>Quên chấm công</option>
                            <option value={3}>Đi sớm về muộn</option>
                            <option value={2}>Onsite</option>
                        </select>
                        <div className="content__employee-add col-lg-5 col-md-6">
                            <button onClick={handleSearchRequest}>
                                <span>Tìm kiếm</span>
                            </button>
                        </div>
                    </div>
                </div>
            <div className="content__employee-table">
                <div className="content__employee-container">
                    <div className="content__employee-thead">
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
                            <h3>Thao tác</h3>
                        </div>
                    </div>
                    <div className="content__employee-tbody">
                        {
                            renderRequest()
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResquestManagement;