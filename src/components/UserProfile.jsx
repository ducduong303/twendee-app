import React, { useState, useContext } from 'react';
import HeadingTitleContent from './HeadingTitleContent';
import { MdEdit } from 'react-icons/md';
import { ContextProvider } from '../context/Context';
import moment from 'moment';
function UserProfile(props) {
    const { user } = useContext(ContextProvider)
    const [editTingProfile, setEditTingProfile] = useState(false)

    const ToggleEditTing = () => {
        setEditTingProfile(!editTingProfile)
    }


    return (
        <>
            <HeadingTitleContent>Cập nhật thông tin</HeadingTitleContent>
            <div className="content__profile">
                <div className="content__profile-container">
                    <div className="content__profile-item">
                        <div className="content__profile-itemLeft col-lg-4">
                            <img className="content__profile-img" src={user && user.avatar} alt="" />
                        </div>
                        <div className="content__profile-itemCenter col-lg-8">
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Họ tên:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-8">
                                    <h4>{user && user.name}</h4>
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Vị trí:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-8">
                                    <h4>

                                        {editTingProfile ? <input type="text" defaultValue={user && user.position}></input> : user && user.position}
                                    </h4>
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Số Chứng minh thư:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-8">
                                    <h4>{user && user.cardId}</h4>
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Số điện thoại:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-8">
                                    <h4>{user && user.phone}</h4>
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Email:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-8">
                                    <h4>{user && user.email}</h4>
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Ngày sinh:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-8">
                                    <h4>{user && moment(parseInt(user.birthday)).format("DD-MM-YYYY")}</h4>
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Địa chỉ:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-8">
                                    <h4>{user && user.address}</h4>
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Giới tính:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-8">
                                    <h4>{user && user.gender ? "Nam" : "Nữ"}</h4>
                                </div>
                            </div>
                        </div>
                        <button
                            className="content__profile-btnEdit"
                            onClick={ToggleEditTing}
                        ><MdEdit size={25} /></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;