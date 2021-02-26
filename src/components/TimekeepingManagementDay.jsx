import React, { useEffect, useState, useRef } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import CallApi from '../utils/CallApi';
import moment from 'moment';
import UseConvertMs from '../hooks/UseConvertMs';
function TimekeepingManagementDay(props) {

    const today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const day = Date.parse(date)
    const [currentDay, setcurrentDay] = useState(day);

    const [timeKeeping, setTimeKeeping] = useState([])
    useEffect(() => {
        CallApi(`admin/time-keepings?date=${currentDay}`)
            .then(res => {
                setTimeKeeping([...res.data])        
            })
    }, [currentDay])


    const time = () => {
        let time = currentDay;
        time = moment(parseInt(currentDay)).format("YYYY-MM-DD")
        return time
    }
    const typingTimeoutRef = useRef(null);
  
    const handleChangeDay = (e) => {
        let date = Date.parse(e.target.value)
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(() => {
            if(moment(e.target.value, "YYYY MM DD").isValid()){
                setcurrentDay(date)
            }else{
                alert("ngày ko hợp lệ")
            }
        }, 500)
    }
    const renderRequest = () => {
        let result;
        if (timeKeeping.length > 0) {
            result = timeKeeping.map((item, index) => {
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
                            <h3>{UseConvertMs(item.checkin)}</h3>
                        </div>
                        <div className="content__employee-theadItem active-theadItem col-item-5 ">
                            <h3>{UseConvertMs(item.checkout)}</h3>
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
        <div className="content__employee">
            <div className="content__employee-title">
                <h3>  <GoPrimitiveDot />Quản lý Chấm công Theo Ngày</h3>
            </div>
            <div className="content__employee-head">
                <div className=" content__employee-box content__employee-container">
                    <form className="content__employee-search col-lg-3 col-md-6">
                        <input type="date" name="date" defaultValue={time()} onChange={handleChangeDay} />
                    </form>
                </div>
            </div>
            <div className="content__employee-table">
                <div className="content__employee-container">
                    <div className="content__employee-thead thead-isShow">
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
        </div>


    );
}

export default TimekeepingManagementDay;