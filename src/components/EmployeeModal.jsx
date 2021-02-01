import React, { useContext, useState, useEffect } from 'react';
import classNames from "classnames"

import { ContextProvider } from '../context/Context';
import moment from 'moment';
import { BiImageAdd, BiXCircle } from 'react-icons/bi';
import { storage } from '../config/firebase';
import { Progress } from 'reactstrap';
function EmployeeModal(props) {
    const { isShowModal, handleToggleShowModal, handleAddEmployee, editTingEmployee } = useContext(ContextProvider);

    const [inputs, setInputs] = useState({
        id: "",
        email: "",
        pass: "",
        name: "",
        phone: "",
        birthday: "",
        cardId: "",
        address: "",
        gender: true,
        position: "",
        vip: true

    })

    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageEdit, setImageEidt] = useState(null)
    
    useEffect(() => {
        if (!editTingEmployee) {
            setImageEidt(null)
        } else {
            setImageEidt(editTingEmployee.avatar)
        }
    }, [editTingEmployee])
    useEffect(() => {
        if (!image) {
            setPreviewImage(null)
            return
        }
        const objectUrl = URL.createObjectURL(image)
        setPreviewImage(objectUrl)
        // Clear khi unmount
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    useEffect(() => {
        if (editTingEmployee) {
            const time = () =>{
                let time = editTingEmployee.birthday;
                if(time === editTingEmployee.birthday){
                    time =  moment(parseInt(editTingEmployee.birthday)).format("YYYY-MM-DD")
                }
                return time
            }
            setInputs({
                id: editTingEmployee.userId,
                email: editTingEmployee.email,
                pass: editTingEmployee.pass,
                name: editTingEmployee.name,
                phone: editTingEmployee.phone,
                birthday: time(),
                cardId: editTingEmployee.cardId,
                address: editTingEmployee.address,
                gender: editTingEmployee.gender,
                position: editTingEmployee.position,
                vip: editTingEmployee.vip
            })
        } else {
            setInputs({
                id: "",
                email: "",
                pass: "",
                name: "",
                phone: "",
                birthday: "",
                cardId: "",
                address: "",
                gender: true,
                position: "",
                vip: true
            })
        }
    }, [editTingEmployee])
    const clearInput = () => {
        setInputs({
            id: "",
            email: "",
            pass: "",
            name: "",
            phone: "",
            birthday: "",
            cardId: "",
            address: "",
            gender: true,
            position: "",
            vip: true
        })
        setImage(null)
        setProgress(0)
    }

    const handleChangeImage = (e) => {
        // Xét trường hợp có ảnh edit hayy không ?
        if (imageEdit) {
            // console.log("không có ảnh edit");
            setImageEidt(null)
            if (!e.target.files || e.target.files.length === 0) {
                setImage(null)
                return
            }
            setImage(e.target.files[0]);
        } else {
            if (e.target.files[0]) {
                setImage(e.target.files[0]);
            }

        }

    }
    const handleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        switch (name) {
            case "vip":
                value = value === "false" ? false : true
                break;
            case "gender":
                value = value === "nam" ? true : false
                break;
            default:
        }

        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const handleUpload = () => {
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
                            handleAddEmployee({
                                ...inputs,
                                avatar: res
                            })
                            handleToggleShowModal();
                            clearInput()

                        })
                }
            )
        } else {
            handleAddEmployee({
                ...inputs,
               
                avatar: imageEdit ? imageEdit : "https://picsum.photos/id/237/200/300",
            })
            handleToggleShowModal();
            clearInput()
        }
    }
   

    return (
        <div className={classNames("content__employee-modal", { activeModal: isShowModal })}>
            <div className="overlay" onClick={handleToggleShowModal}></div>
            <div className={classNames("content__employee-form col-lg-5 col-md-10 col-sm-10", { activeForm: isShowModal })}>
                <div className="content__employee-formInput">
                    <div className="content__employee-group">
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="name"> Tên Nhân viên</label>
                            <input type="text" name="name" id="name" value={inputs.name} onChange={handleChange} placeholder="Họ tên" />
                        </div>
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="birthday">Ngày sinh</label>
                            <input type="date" name="birthday" id="birthday" value={inputs.birthday}  onChange={handleChange} />
                        </div>
                    </div>
                    <div className="content__employee-group">
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="cardId">Số chứng minh thư</label>
                            <input type="number" name="cardId" id="cardId" value={inputs.cardId} onChange={handleChange} placeholder="Số chứng minh thư" />
                        </div>
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input type="number" name="phone" id="phone" value={inputs.phone} onChange={handleChange} placeholder="Số điện thoại" />
                        </div>
                    </div>
                    <div className="content__employee-group">
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" disabled={editTingEmployee} id="email" value={inputs.email} onChange={handleChange} placeholder="Email" />
                        </div>
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="pass">Mật khẩu</label>
                            <input type="password" name="pass" id="pass" value={inputs.pass} onChange={handleChange} placeholder="Mật khẩu" />
                        </div>
                    </div>
                    <div className="content__employee-group">
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="address">Địa chỉ</label>
                            <input type="text" name="address" id="address" value={inputs.address} onChange={handleChange} placeholder="Địa chỉ" />
                        </div>
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="position">Chức vụ </label>
                            <input type="text" name="position" id="position" value={inputs.position} onChange={handleChange} placeholder="Chức vụ" />
                        </div>
                    </div>
                    <div className="content__employee-group">
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="gender">Giới tính?</label>
                            <select name="gender" id="gender" value={inputs.gender} onChange={handleChange}>
                                <option value={true}>Nam</option>
                                <option value={false}>Nữ</option>
                            </select>
                        </div>
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="vip">Có phải điểm danh ?</label>
                            <select name="vip" id="vip" value={inputs.vip} onChange={handleChange}>
                                <option value={true}>Có</option>
                                <option value={false}>Không</option>
                            </select>
                        </div>
                    </div>
                    <div className="content__employee-formControl">
                        <div className="formControlFile">
                            <label>Ảnh </label>
                            <label htmlFor="file"><BiImageAdd size={25} htmlFor="file" /> <input type="file" id="file" className="inputFile" onChange={handleChangeImage} placeholder="ảnh" /></label>
                        </div>

                        {
                            !imageEdit ? <>
                                {image ? <img src={previewImage} alt="" style={{ width: "60px", height: "60px" }}></img> : "Chưa có ảnh nào"} {image ? <BiXCircle size={25} onClick={() => setImage(null)} /> : null}
                            </>
                                :
                                <> <img src={imageEdit} alt="" style={{ width: "60px", height: "60px" }}></img></>
                        }
                        {
                            image ? <Progress animated color="success" value={progress}>{progress}%</Progress>
                                : null
                        }
                    </div>
                    <div className="content__employee-formControl formControl-btn">
                        <button onClick={handleToggleShowModal}>Trở về</button>
                        <button onClick={handleUpload}>Thêm mới</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EmployeeModal;