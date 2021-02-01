import React from 'react';
import { GoPrimitiveDot} from 'react-icons/go';
function TimekeepingManagementMonth(props) {
    return (
        <div className="content__employee">
            <div className="content__employee-title">
                <h3>  <GoPrimitiveDot/>Quản lý Chấm công Theo Tháng</h3>
            </div>
            <div className="content__employee-table">
                <div className="content__employee-container">
                    <div className="content__employee-thead">
                        <div className="content__employee-theadItem">
                            <h3>STT</h3>
                        </div>
                        <div className="content__employee-theadItem">
                            <h3>Tên nhân viên </h3>
                        </div>
                        <div className="content__employee-theadItem">
                            <h3>Số lần điểm danh </h3>
                        </div>
                        <div className="content__employee-theadItem">
                            <h3>Số ngày nghỉ</h3>
                        </div>
                        <div className="content__employee-theadItem">
                            <h3>Số lần muộn </h3>
                        </div>
                        <div className="content__employee-theadItem">
                            <h3>Số phút muộn</h3>
                        </div>
                    </div>
                    <div className="content__employee-tbody">
                        {/* 
                        
                            Đợi api
                        */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimekeepingManagementMonth;