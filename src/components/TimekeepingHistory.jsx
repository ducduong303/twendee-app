import React, { useContext, useEffect, useState } from 'react';
import HeadingTitleContent from './HeadingTitleContent';
import { ContextProvider } from '../context/Context';
import CallApi from '../utils/CallApi';
import { FiSearch } from 'react-icons/fi';
import moment from 'moment';

function TimekeepingHistory(props) {

    const { user } = useContext(ContextProvider);
    const [timeKeepingHistory, setTimeKeepingHistory] = useState([])

    useEffect(() => {
        if (user) {
            const data = {
                email: user.email,
            }
            CallApi(`history/?email=${data.email}`, "POST", null).then(res => {
                setTimeKeepingHistory([...res.data])
            })
        }
    }, [user])

    // Hàm convert Ms
    function convertMS(duration) {
        var seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds
    }
    const renderRequest = () => {
        let result;
        if (timeKeepingHistory.length > 0) {
            result = timeKeepingHistory.map((item, index) => {
                return (
                    <div key={index} className="content__employee-thead active-thead">
                        <div className="content__employee-theadItem active-theadItem col-item-1  ">
                            <h3>{index + 1}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem  col-item-2 ">
                            <h3>{item.username}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem  col-item-3 ">
                            <h3>{moment((item.date)).format("DD-MM-YYYY")}  </h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-4 ">
                            <h3>{convertMS(item.checkin)}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-5 ">
                            <h3>{convertMS(item.checkout)}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-6 ">
                            <h3>{item.timeLate}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-7 ">
                            <h3>{item.timeEarly}</h3>
                        </div>
                    </div>
                )
            })
        }
        return result;
    }
    return (
        <>
            <HeadingTitleContent>Lịch sử điểm danh </HeadingTitleContent>
            <div className="content__employee-head">
                <div className=" content__employee-box content__employee-container">
                    <form className="content__employee-search col-lg-3 col-md-6">
                        <input type="text" placeholder="Seacrh month " />
                        <FiSearch size={20} className="search-icon" />
                    </form>
                </div>
            </div>
            <div className="content__employee-table">
                <div className="content__employee-container">
                    <div className="content__employee-thead">
                        <div className="content__employee-theadItem col-item-1">
                            <h3>STT</h3>
                        </div>
                        <div className="content__employee-theadItem col-item-2">
                            <h3>Tên nhân viên </h3>
                        </div>
                        <div className="content__employee-theadItem col-item-3">
                            <h3>Ngày</h3>
                        </div>
                        <div className="content__employee-theadItem col-item-4">
                            <h3>Giờ vào</h3>
                        </div>
                        <div className="content__employee-theadItem col-item-5">
                            <h3>Giờ ra</h3>
                        </div>
                        <div className="content__employee-theadItem col-item-6">
                            <h3>Giờ trễ</h3>
                        </div>
                        <div className="content__employee-theadItem col-item-7">
                            <h3>Giờ sớm</h3>
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

export default TimekeepingHistory;