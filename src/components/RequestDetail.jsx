import React, { useEffect, useState, useContext } from 'react';
import CallApi from '../utils/CallApi';
import HeadingTitleContent from './HeadingTitleContent';
import moment from 'moment';
import { ContextProvider } from '../context/Context';
import { useHistory } from 'react-router-dom';
function RequestDetail(props) {
    const [item, setItem] = useState(null)
    const history = useHistory('');
    const { handleAcceptRequest, handleDeleteRequest , handleRefuseRequest} = useContext(ContextProvider)
    useEffect(() => {
        let portID = props.match.params;
        CallApi(`admin/requests/${portID.id}`, "GET", null)
            .then(res => {
                setItem(res.data)
            })
        return () => {

        }
    }, [props.match.params])

    const handleAccept = (id) => {
        handleAcceptRequest(id)
    }
    const handleRefuse = (id) =>{
        handleRefuseRequest(id)
    }
    const handleGoBack = () => {
        history.push("/admin/quanlydontu")
    }
    const handleDelte = (id) => {
        handleDeleteRequest(id)
        history.push("/admin/quanlydontu")
    }
    const handleRender = () => {
        let result;
        switch (item && item.type) {
            case "Xin nghỉ":
                result = (
                    <>
                        <h1>Loại đơn : {item && item.type} - {item && item.requestId}</h1>
                        <h3>Người gửi : {item && item.email}</h3>
                        <h4>Ngày gửi đơn : {item && moment((item.timeRequest)).format("DD-MM-YYYY")}</h4>
                        <h4>Lý do : {item && item.reason}</h4>
                        <div className="content__employee-requestDetail-box">
                            <h4>Ngày bắt đầu nghỉ : {item && moment(parseInt(item.startDate)).format("DD-MM-YYYY")}</h4>
                            <h4>-</h4>
                            <h4>Ngày kết thúc nghỉ: {item && moment(parseInt(item.endDate)).format("DD-MM-YYYY")}</h4>
                        </div>
                        <h4>Trạng Thái : {item.isAccept === true ? <span className="accept">chấp nhận</span> : item.isAccept === false ?
                            <span className="refuse">từ chối</span> : item.isAccept === null ? <span className="pending">chưa duyệt</span> : ""}
                        </h4>
                        {
                            item && item.isAccept === null ? <div className="content__employee-requestDetail-box">
                                <button onClick={() => handleAccept(item.requestId)}>Chấp nhận</button>
                                <button onClick={() => handleRefuse(item.requestId)}>Từ chối</button>
                            </div> : null
                        }
                        <div className="btnRequest">
                            <button onClick={handleGoBack}>Trở về</button>
                            <button onClick={() => handleDelte(item.requestId)}>Xóa</button>

                        </div>

                    </>
                )
                break;
            case "Quên check out":
                result = (
                    <>
                        <h1>Loại đơn : {item && item.type} - {item && item.requestId}</h1>
                        <h3>Người gửi : {item && item.email}</h3>
                        <h4>Ngày gửi đơn  : {item && moment((item.timeRequest)).format("DD-MM-YYYY")}</h4>
                        <h4>Ngày quên checkOut :{item && moment(parseInt(item.date)).format("DD-MM-YYYY")} </h4>
                        <h4>Trạng Thái : {item.isAccept === true ? <span className="accept">chấp nhận</span> : item.isAccept === false ?
                            <span className="refuse">từ chối</span> : item.isAccept === null ? <span className="pending">chưa duyệt</span> : ""}
                        </h4>
                        {
                            item && item.isAccept === null ? <div className="content__employee-requestDetail-box">
                                <button onClick={() => handleAccept(item.requestId)}>Chấp nhận</button>
                                <button  onClick={() => handleRefuse(item.requestId)}>Từ chối</button>
                            </div> : null
                        }
                        <div className="btnRequest">
                            <button onClick={handleGoBack}>Trở về</button>
                            <button onClick={() => handleDelte(item.requestId)}>Xóa</button>

                        </div>
                    </>
                )
                break;
            case "Đi muộn - Về sớm":
                result = (
                    <>
                        <h1>Loại đơn : {item && item.type} - {item && item.requestId}</h1>
                        <h3>Người gửi : {item && item.email}</h3>
                        <h4>Ngày gửi đơn : {item && moment((item.timeRequest)).format("DD-MM-YYYY")}</h4>
                        <h4>Lý do : {item && item.reason}</h4>
                        <div className="content__employee-requestDetail-box">
                            <h4>Ngày xin đi muộn về sớm : {item && moment(parseInt(item.date)).format("DD-MM-YYYY")}</h4>
                        </div>
                        <div className="content__employee-requestDetail-box">
                            <h4>Thời gian đi muộn : {item && item.timeLate} phút</h4>
                            <h4>-</h4>
                            <h4>Thời gian về sớm : {item && item.timeEarly} phút</h4>
                        </div>
                        <h4>Trạng Thái : {item.isAccept === true ? <span className="accept">chấp nhận</span> : item.isAccept === false ?
                            <span className="refuse">từ chối</span> : item.isAccept === null ? <span className="pending">chưa duyệt</span> : ""}
                        </h4>
                        {
                            item && item.isAccept === null ? <div className="content__employee-requestDetail-box">
                                <button onClick={() => handleAccept(item.requestId)}>Chấp nhận</button>
                                <button  onClick={() => handleRefuse(item.requestId)}>Từ chối</button>
                            </div> : null
                        }
                        <div className="btnRequest">
                            <button onClick={handleGoBack}>Trở về</button>
                            <button onClick={() => handleDelte(item.requestId)}>Xóa</button>

                        </div>
                    </>
                )
                break;
            case "On site":
                result = (
                    <>
                        <h1>Loại đơn : {item && item.type} - {item && item.requestId}</h1>
                        <h3>Người gửi : {item && item.email}</h3>
                        <h4>Ngày gửi đơn  : {item && moment((item.timeRequest)).format("DD-MM-YYYY")}</h4>
                        <h4>Lý do : {item && item.reason}</h4>
                        <div className="content__employee-requestDetail-box">
                            <h4>Ngày bắt đầu nghỉ : {item && moment(parseInt(item.startDate)).format("DD-MM-YYYY")}</h4>
                            <h4>-</h4>
                            <h4>Ngày kết thúc nghỉ: {item && moment(parseInt(item.endDate)).format("DD-MM-YYYY")}</h4>
                        </div>
                        <h4>Trạng Thái : {item.isAccept === true ? <span className="accept">chấp nhận</span> : item.isAccept === false ?
                            <span className="refuse">từ chối</span> : item.isAccept === null ? <span className="pending">chưa duyệt</span> : ""}
                        </h4>
                        {
                            item && item.isAccept === null ? <div className="content__employee-requestDetail-box">
                                <button onClick={() => handleAccept(item.requestId)}>Chấp nhận</button>
                                <button  onClick={() => handleRefuse(item.requestId)}>Từ chối</button>
                            </div> : null
                        }
                        <div className="btnRequest">
                            <button onClick={handleGoBack}>Trở về</button>
                            <button onClick={() => handleDelte(item.requestId)}>Xóa</button>
                        </div>
                    </>
                )
                break;
            default:
                return item && item.type
        }
        return result;
    }
    return (
        <>
            <HeadingTitleContent>Đơn từ -- [ {item && item.email} ]</HeadingTitleContent>
            <div className="content__employee-head">
                <div className=" content__employee-box content__employee-container">

                </div>
            </div>
            <div className="content__employee-table">
                <div className="content__employee-container">
                    <div className="content__employee-requestDetail">
                        {
                            handleRender()
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default RequestDetail;