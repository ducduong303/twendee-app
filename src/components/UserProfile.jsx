import React, { useState, useContext, useEffect } from 'react';
import HeadingTitleContent from './HeadingTitleContent';
import { MdEdit } from 'react-icons/md';
import { AiOutlineSave } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { ContextProvider } from '../context/Context';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { storage } from '../config/firebase';
import { Progress } from 'reactstrap';


function UserProfile(props) {

    let schema = yup.object().shape({
        pass: yup.string().required().min(6),
        name: yup.string().required().min(3).max(20),
        phone: yup.string().required().min(10),
        birthday: yup.string().required(),
        cardId: yup.string().required().min(9),
        address: yup.string().required(),
        gender: yup.string().required(),
    });
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    const { user, handleUpdateProfile, handleCloseLogout } = useContext(ContextProvider)




    const [editTingProfile, setEditTingProfile] = useState(false)
    const [genderEdit, setGenderEdit] = useState(null)


    const [previewImage, setPreviewImage] = useState(null);
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(null)


    const [status, setStatus] = useState(false)
    const openEditTing = () => {
        setEditTingProfile(true)
        setStatus(true)
        handleCloseLogout()
    }
   

    useEffect(() => {
        if (user) {
            setPreviewImage(user.avatar)
            setGenderEdit(user.gender)
        }
    }, [user])



    useEffect(() => {
        if (!image) {
            setPreviewImage(user && user.avatar)
            return
        }
        const objectUrl = URL.createObjectURL(image)
        setPreviewImage(objectUrl)
        // Clear khi unmount
        return () => URL.revokeObjectURL(objectUrl)
    }, [image, user])

    const saveEditTing = () => {
        setStatus(false)
    }
    const handleUpload = (data) => {
        if (status) {
            // console.log("đang Edit", data);
            return;
        } else {

            if (image) {
                const uploadTask = storage.ref(`images/${image.name}`).put(image);
                uploadTask.on(
                    "state_changed",
                    snapshot => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        setProgress(progress)
                    },
                    err => {
                        console.log(err);
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(image.name)
                            .getDownloadURL()
                            .then(res => {
                                handleUpdateProfile({
                                    ...data,
                                    gender: data.gender === "true" ? true : false,
                                    email: user && user.email,
                                    avatar: res
                                }, user.userId)
                                setEditTingProfile(false)
                                setProgress(0)

                            })
                    }
                )
            } else {
                handleUpdateProfile({
                    ...data,
                    gender: data.gender === "true" ? true : false,
                    email: user && user.email,
                    avatar: user.avatar,
                }, user.userId)
                setEditTingProfile(false)
            }

        }
    }
    const handleChangeImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleOnChangeGender = (e) => {
        setGenderEdit(e.target.value)
    }
    return (
        <>
            <HeadingTitleContent>Cập nhật thông tin</HeadingTitleContent>
   
            <div className="content__profile">
                <div className="content__profile-container">
                    <div className="content__profile-item">
                        <div className={`content__profile-itemLeft col-lg-4 col-md-6 col-sm-12 ${!editTingProfile ? "active" : ""}`}>
                            {
                                editTingProfile ?
                                    <>
                                        <label htmlFor="file" className="content__profile-itemLeft-box">
                                            <div className="content__profile-img">
                                                <img src={previewImage} alt="" />
                                                <label htmlFor="file" className="iconfile"><BiImageAdd size={35} htmlFor="file" /> <input type="file" id="file" onChange={handleChangeImage} className="inputFile" /></label>
                                            </div>
                                        </label>
                                    </>
                                    : <img className="content__profile-img" src={user && user.avatar} alt="" />
                            }
                            {
                                editTingProfile ? <Progress animated color="success" value={progress}>{progress}%</Progress> : null
                            }

                        </div>
                        <form onSubmit={handleSubmit(handleUpload)} className="content__profile-itemCenter col-lg-8 col-md-6 col-sm-12">
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Họ tên:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-6">
                                    <h4>
                                        {editTingProfile ? <input type="text" name="name" id="name" ref={register}
                                            defaultValue={user && user.name}></input>
                                            : user && user.name}
                                    </h4>
                                    {errors.name && errors.name.type === "required" ? <p>{errors.name.type === "required" && "Bạn chưa nhập Tên"}</p> : null}
                                    {errors.name && errors.name.type === "min" ? <p>{errors.name.type === "min" && "Tên ít nhất có 3 ký tự"}</p> : null}
                                    {errors.name && errors.name.type === "max" ? <p>{errors.name.type === "max" && "Tên không được quá 20 ký tự"}</p> : null}
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Vị trí:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-6">
                                    <h4>

                                        {editTingProfile ? <input type="text" disabled={editTingProfile} defaultValue={user && user.position}></input> : user && user.position}
                                    </h4>
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Số Chứng minh thư:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-6">
                                    <h4>
                                        {editTingProfile ? <input type="text" name="cardId" id="cardId" ref={register} defaultValue={user && user.cardId} ></input> : user && user.cardId}
                                    </h4>
                                    {errors.cardId && errors.cardId.type === "required" ? <p>{errors.cardId.type === "required" && "Bạn chưa nhập số chứng minh thư"}</p> : null}
                                    {errors.cardId && errors.cardId.type === "min" ? <p>{errors.cardId.type === "min" && "Số chứng minh thư phải ít nhất có 9 ký tự "}</p> : null}
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Số điện thoại:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-6">
                                    <h4>
                                        {editTingProfile ? <input type="text" name="phone" id="phone" ref={register} defaultValue={user && user.phone} ></input> : user && user.phone}
                                    </h4>
                                    {errors.phone && errors.phone.type === "required" ? <p>{errors.phone.type === "required" && "Bạn chưa nhập số điện thoại"}</p> : null}
                                    {errors.phone && errors.phone.type === "min" ? <p>{errors.phone.type === "min" && "Số điện thoại ít nhất có 10 ký tự"}</p> : null}
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Email:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-6">
                                    <h4>  {editTingProfile ? <input type="email" disabled={editTingProfile} defaultValue={user && user.email}></input> : user && user.email}
                                    </h4>
                                    {errors.email && errors.email.type === "required" ? <p>{errors.email.type === "required" && "Bạn chưa nhập Email"}</p> : null}
                                    {errors.email && errors.email.type === "email" ? <p>{errors.email.type === "email" && "Email không hợp lệ"}</p> : null}
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Mật khẩu:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-6">
                                    <h4>  {editTingProfile ? <input type="password" name="pass" id="pass" defaultValue={user && user.pass} ref={register} ></input>
                                        : user && <input type="password" style={{border:"none",background:"none",paddingLeft:"0"}} disabled={!editTingProfile}  name="pass" id="pass" defaultValue={user && user.pass}  ref={register} ></input>}
                                    </h4>
                                    {errors.pass && errors.pass.type === "required" ? <p>{errors.pass.type === "required" && "Bạn chưa nhập password"}</p> : null}
                                    {errors.pass && errors.pass.type === "min" ? <p>{errors.pass.type === "min" && "Mật khẩu ít nhất 6 ký tự"}</p> : null}
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Ngày sinh:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-6">
                                    <h4>
                                        {
                                            editTingProfile ? <input type="date" name="birthday" id="birthday" ref={register} defaultValue={user && moment(parseInt(user.birthday)).format("YYYY-MM-DD")}></input> : user && moment(parseInt(user.birthday)).format("DD-MM-YYYY")
                                        }
                                    </h4>
                                    {errors.birthday && errors.birthday.type === "required" ? <p>{errors.birthday.type === "required" && "Bạn chưa nhập ngày sinh"}</p> : null}
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Địa chỉ:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-6">
                                    <h4>
                                        {editTingProfile ? <input type="text" name="address" id="address" ref={register} defaultValue={user && user.address}></input> : user && user.address}

                                    </h4>
                                    {errors.address && errors.address.type === "required" ? <p> Bạn chưa nhập địa chỉ</p> : null}
                                </div>
                            </div>
                            <div className="content__profile-personalInfo">
                                <div className="content__profile-personalInfoTitle col-4">
                                    <h3>Giới tính:</h3>
                                </div>
                                <div className="content__profile-personalInfoText col-6">
                                    <h4>
                                        {
                                            editTingProfile ? (
                                                <select name="gender" id="gender" value={genderEdit} ref={register} onChange={handleOnChangeGender}  >
                                                    <option value={true}>Nam</option>
                                                    <option value={false}>Nữ</option>
                                                </select>
                                            ) : (user && user.gender ? "Nam" : "Nữ")
                                        }
                                    </h4>
                                </div>
                            </div>
                            {
                                !editTingProfile ? <button
                                    className="content__profile-btnEdit"
                                    onClick={openEditTing}
                                ><MdEdit size={25} /></button> : <button
                                    type="submit"
                                    className="content__profile-btnEdit"
                                    onClick={saveEditTing}
                                ><AiOutlineSave size={25} /></button>
                            }
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;