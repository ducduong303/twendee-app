
import React, { useState, useContext } from 'react';
import HeadingTitleContent from './HeadingTitleContent';
import { ContextProvider } from '../context/Context';

function UserRequest(props) {
    const { handleUsersRequest } = useContext(ContextProvider);

    const [request, setRequest] = useState("1")
    const handleOnchageRequest = (e) => {
        setRequest(e.target.value)
    }
    const [inputs, setInputs] = useState({
        email: "",
        startDate: "",
        endDate: "",
        reason: "",


    })

    const handleOnchage = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = (e) => {
        handleUsersRequest(inputs, request)
    }
    const handleRenderRequest = () => {
        let result;
        switch (request) {
            case "1":
                result = (
                    <>
                        <div className="content__request-item content__request-dayoff">
                            <div className="content__request-box">
                                <h3 className="content__request-dayoffTitle">
                                    Đơn Xin Nghỉ
                                </h3>
                                <div className="content__request-itemContent">
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Email </label>
                                        <input type="email" name="email"
                                            onChange={handleOnchage}
                                            value={inputs.email}
                                            placeholder="Email" />
                                    </div>
                                    <div className="content__request-group">
                                        <div className="content__request-itemForm">
                                            <label htmlFor="">Ngày bắt đầu </label>
                                            <input type="date"
                                                name="startDate"
                                                value={inputs.startDate}
                                                onChange={handleOnchage} />
                                        </div>
                                        <div className="content__request-itemForm">
                                            <label htmlFor="">Ngày kết thúc </label>
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={inputs.endDate}
                                                onChange={handleOnchage} />
                                        </div>
                                    </div>
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Lí do </label>
                                        <textarea rows="5"
                                            value={inputs.reason}
                                            cols="50"
                                            name="reason" onChange={handleOnchage} > </textarea>
                                    </div>
                                </div>
                                <button onClick={handleSubmit}>Click</button>
                            </div>
                        </div>
                    </>
                )
                break;
            case "2":
                result = (
                    <div className="content__request-item content__request-dayoff">
                        <div className="content__request-box">
                            <h3 className="content__request-dayoffTitle">
                                Quên Điểm Danh
                        </h3>
                            <div className="content__request-itemContent">
                                <div className="content__request-itemForm">
                                    <label htmlFor="">Email </label>
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className="content__request-itemForm">
                                    <label htmlFor="">Ngày </label>
                                    <input type="date" />
                                </div>
                            </div>
                        </div>
                    </div>
                )
                break;
            case "3":
                result = (
                    <div className="content__request-item content__request-dayoff">
                        <div className="content__request-box">
                            <h3 className="content__request-dayoffTitle">
                                Đi muộn về sớm
                        </h3>
                            <div className="content__request-itemContent">
                                <div className="content__request-itemForm">
                                    <label htmlFor="">Email </label>
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className="content__request-group">
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Ngày xin</label>
                                        <input type="date" />
                                    </div>
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Thời gian đi muộn (phút) </label>
                                        <input type="number" />
                                    </div>
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Thời gian về sớm (phút)</label>
                                        <input type="number" />
                                    </div>
                                </div>
                                <div className="content__request-itemForm">
                                    <label htmlFor="">Lí do </label>
                                    <textarea rows="5" cols="50"> </textarea>
                                </div>

                            </div>
                        </div>
                    </div>
                )
                break;
            case "4":
                result = (
                    <div className="content__request-item content__request-dayoff">
                        <div className="content__request-box">
                            <h3 className="content__request-dayoffTitle">
                                On Site
                    </h3>
                            <div className="content__request-itemContent">
                                <div className="content__request-itemForm">
                                    <label htmlFor="">Email </label>
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className="content__request-group">
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Ngày bắt đầu </label>
                                        <input type="date" />
                                    </div>
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Ngày kết thúc </label>
                                        <input type="date" />
                                    </div>
                                </div>
                                <div className="content__request-itemForm">
                                    <label htmlFor="">Lí do </label>
                                    <textarea rows="5" cols="50"> </textarea>
                                </div>

                            </div>
                        </div>
                    </div>
                )
                break;
            default:
                return result
        }

        return result
    }

    return (
        <>
            <HeadingTitleContent>Đơn Từ</HeadingTitleContent>
            <div className="content__request">
                <div className="content__request-container">
                    <div className="content__request-content col-lg-8">
                        {handleRenderRequest()}
                    </div>
                    <div className="content__request-title col-lg-2">
                        <select value={request} onChange={handleOnchageRequest}>
                            <option value={1}>Xin nghỉ </option>
                            <option value={2}>Điểm danh hộ</option>
                            <option value={3}>Đi muộn về sớm</option>
                            <option value={4}>On site</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserRequest;