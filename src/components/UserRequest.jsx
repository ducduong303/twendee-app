
import React, { useState, useContext } from 'react';
import HeadingTitleContent from './HeadingTitleContent';
import { ContextProvider } from '../context/Context';


function UserRequest(props) {
    const { handleUsersRequest, user } = useContext(ContextProvider);

    const [requestUser, setRequestUser] = useState("1")
    const handleOnchageRequest = (e) => {
        setRequestUser(e.target.value)
    }


    const [inputs, setInputs] = useState({
        email: user && user.email,
        startDate: "",
        endDate: "",
        reason: "",
        timeLate: "",
        timeEarly: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("inputs", inputs);


        handleUsersRequest(inputs, requestUser)
        setInputs({
            email: "",
            startDate: "",
            endDate: "",
            reason: "",
            timeLate: "",
            timeEarly: ""
        })
    }

    const hanleChange = (e) => {

        setInputs({
            ...inputs,
            email: user && user.email,
            [e.target.name]: e.target.value,
        })
    }
    const handleRenderRequest = () => {
        let result;
        switch (requestUser) {
            case "1":
                result = (
                    <>
                        <div className="content__request-item content__request-dayoff">
                            <div className="content__request-box">
                                <h1 className="content__request-reasonTitle">
                                    Đơn Xin Nghỉ
                                 </h1>
                                <form onSubmit={handleSubmit} className="content__request-itemContent">
                                    <div className="content__request-itemContent-box col-lg-10">
                                        <div className="content__request-itemForm">
                                            <label htmlFor="">Email </label>
                                            <input type="email"
                                                name="email"
                                                disabled={user && user.email}
                                                defaultValue={user && user.email}
                                                placeholder="Email"
                                            />

                                        </div>
                                        <div className="content__request-group">
                                            <div className="content__request-itemForm  col-lg-5">
                                                <label htmlFor="">Ngày bắt đầu </label>
                                                <input type="date"
                                                    name="startDate"
                                                    value={inputs.startDate}
                                                    onChange={hanleChange}

                                                />

                                            </div>
                                            <div className="content__request-itemForm col-lg-5">
                                                <label htmlFor="">Ngày kết thúc </label>
                                                <input type="date"
                                                    name="endDate"
                                                    value={inputs.endDate}
                                                    onChange={hanleChange}
                                                />

                                            </div>
                                        </div>
                                        <div className="content__request-itemForm">
                                            <label htmlFor="">Lí do </label>
                                            <textarea rows="5"
                                                name="reason"
                                                cols="50"
                                                value={inputs.reason}
                                                onChange={hanleChange}
                                            />

                                        </div>
                                        <button type="submit">Gửi</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )
                break;
            case "2":
                result = (
                    <div className="content__request-item content__request-dayoff">
                        <div className="content__request-box">
                            <h3 className="content__request-reasonTitle">
                                Quên Điểm Danh
                        </h3>
                            <div className="content__request-itemContent">
                                <form onSubmit={handleSubmit} className="content__request-itemContent-box col-lg-10">
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Email </label>
                                        <input type="email"
                                            name="email"
                                            disabled={user && user.email}
                                            defaultValue={user && user.email}
                                            placeholder="Email" />

                                    </div>

                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Ngày</label>
                                        <input type="date"
                                            name="startDate"
                                            value={inputs.startDate}
                                            onChange={hanleChange}
                                        />

                                    </div>

                                    <button type="submit">Gửi</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
                break;
            case "3":
                result = (
                    <div className="content__request-item content__request-dayoff">
                        <div className="content__request-box">
                            <h3 className="content__request-reasonTitle">
                                Đi sớm về muộn
                        </h3>
                            <div className="content__request-itemContent">
                                <form onSubmit={handleSubmit} className="content__request-itemContent-box col-lg-10">
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Email </label>
                                        <input type="email"
                                            name="email"
                                            // value={inputs.email}
                                            // onChange={hanleChange}
                                            disabled={user && user.email}
                                            defaultValue={user && user.email}
                                            placeholder="Email" />

                                    </div>
                                    <div className="content__request-itemForm ">
                                        <label htmlFor="">Ngày xin  </label>
                                        <input type="date"
                                            name="startDate"
                                            value={inputs.startDate}
                                            onChange={hanleChange}
                                        />

                                    </div>
                                    <div className="content__request-group">
                                        <div className="content__request-itemForm  col-lg-5">
                                            <label htmlFor="">Thời gian đi muộn (phút)</label>
                                            <input type="number"
                                                name="timeLate"
                                                value={inputs.timeLate}
                                                onChange={hanleChange}
                                            />
                                        </div>
                                        <div className="content__request-itemForm col-lg-5">
                                            <label htmlFor="">Thời gian về sớm (phút)</label>
                                            <input type="number"
                                                name="timeEarly"
                                                value={inputs.timeEarly}
                                                onChange={hanleChange}
                                            />

                                        </div>
                                    </div>
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Lí do </label>
                                        <textarea rows="5"
                                            name="reason"
                                            value={inputs.reason}
                                            onChange={hanleChange}
                                            cols="50" />
                                    </div>
                                    <button type="submit">Gửi</button>
                                </form>

                            </div>
                        </div>
                    </div>
                )
                break;
            case "4":
                result = (
                    <div className="content__request-item content__request-dayoff">
                        <div className="content__request-box">
                            <h1 className="content__request-reasonTitle">
                                On Side
                         </h1>
                            <div className="content__request-itemContent">
                                <form onSubmit={handleSubmit} className="content__request-itemContent-box col-lg-10">
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Email </label>
                                        <input type="email"
                                            name="email"

                                            disabled={user && user.email}
                                            defaultValue={user && user.email}
                                        ></input>

                                    </div>
                                    <div className="content__request-group">
                                        <div className="content__request-itemForm  col-lg-5">
                                            <label htmlFor="">Ngày bắt đầu </label>
                                            <input type="date"
                                                name="startDate"
                                                value={inputs.startDate}
                                                onChange={hanleChange}
                                            />

                                        </div>
                                        <div className="content__request-itemForm col-lg-5">
                                            <label htmlFor="">Ngày kết thúc </label>
                                            <input type="date"
                                                name="endDate"
                                                value={inputs.endDate}
                                                onChange={hanleChange}
                                            />

                                        </div>
                                    </div>
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Lí do </label>
                                        <textarea rows="5"
                                            name="reason"
                                            value={inputs.reason}
                                            onChange={hanleChange}
                                            cols="50" />

                                    </div>
                                    <button type="submit">Gửi</button>
                                </form>

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
                    <div className="content__request-content col-lg-9">
                        {handleRenderRequest()}
                    </div>

                    <div className="content__request-title col-lg-2">
                        <select value={requestUser} onChange={handleOnchageRequest}>
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