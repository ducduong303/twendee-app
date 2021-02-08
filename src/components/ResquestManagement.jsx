import React, { useContext } from 'react';
import HeadingTitleContent from './HeadingTitleContent';
import { ContextProvider } from '../context/Context';
import moment from 'moment';
import { FiCheckCircle } from 'react-icons/fi';
import { RiCloseCircleLine } from 'react-icons/ri';
function ResquestManagement(props) {
    const { requestsUser } = useContext(ContextProvider)
    console.log("requestsUser", requestsUser);

    const renderRequest = () => {
        let result;
        if (requestsUser.length > 0) {
            result = requestsUser.map((item, index) => {
                return (
                    <div key={index} className="content__employee-thead active-thead">
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
                            <span><FiCheckCircle size={20} /></span>
                            <span><RiCloseCircleLine size={23} /></span>
                        </div>
                    </div>
                )
            })
        }
        return result;

    }
    return (
        <>
            <HeadingTitleContent>Quản lý đơn từ</HeadingTitleContent>
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