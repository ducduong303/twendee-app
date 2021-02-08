
import React, { useContext, useState, useEffect } from 'react';
import classNames from "classnames"

import { ContextProvider } from '../context/Context';
import moment from 'moment';
import { BiImageAdd} from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { storage } from '../config/firebase';
import { Progress } from 'reactstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

let schema = yup.object().shape({
    email: yup.string().required().email(),
    pass: yup.string().required().min(6),
    name: yup.string().required().min(3).max(20),
    phone: yup.string().required().min(10),
    birthday: yup.string().required(),
    cardId: yup.string().required().min(9),
    address: yup.string().required(),
    gender: yup.string().required(),
    position: yup.string().required(),
    vip: yup.string().required(),
});
function EmployeeModal(props) {
    const { isShowModal, handleCloseForm, handleAddEmployee, editTingEmployee } = useContext(ContextProvider);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    const [inputs, setInputs] = useState({
        id: "",
        email: "",
        pass: "",
        name: "",
        phone: "",
        birthday: "",
        cardId: "",
        address: "",
        gender: "",
        position: "",
        vip: ""
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
        console.log("editTingEmployee",editTingEmployee);
        
        if (editTingEmployee) {
            console.log("đang edit");
            const time = () => {
                let time = editTingEmployee.birthday;
                if (time === editTingEmployee.birthday) {
                    time = moment(parseInt(editTingEmployee.birthday)).format("YYYY-MM-DD")
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
            console.log("đang add");
            setInputs({
                id: "",
                email: "",
                pass: "",
                name: "",
                phone: "",
                birthday: "",
                cardId: "",
                address: "",
                gender: "",
                position: "",
                vip: ""
            })
            clearInput()
        }

    }, [])
    const clearInput = () => {
        setImage(null)
        setProgress(0);
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

    const handleOnChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const handleUpload = (data, e) => {
        setInputs({
            ...inputs,
            email: data.email,
            pass: data.pass,
            name: data.name,
            phone: data.phone,
            birthday: data.birthday,
            cardId: data.cardId,
            address: data.address,
            gender: data.gender,
            position: data.position,
            vip: data.vip
        })
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
                                ...data,
                                id: editTingEmployee ? editTingEmployee.userId : "",
                                gender: data.gender === "true" ? true : false,
                                vip: data.vip === "true" ? true : false,
                                avatar: res
                            })
                            clearInput()
                        })
                }
            )
        } else {
            handleAddEmployee({
                ...data,
                id: editTingEmployee ? editTingEmployee.userId : "",
                gender: data.gender === "true" ? true : false,
                vip: data.vip === "true" ? true : false,
                avatar: imageEdit ? imageEdit : "https://picsum.photos/id/237/200/300",
            })
            clearInput()

        }
    }

    return (
        <div className={classNames("content__employee-modal", { activeModal: isShowModal })}>
            <div className="overlay" onClick={handleCloseForm}></div>
            <div className={classNames("content__employee-form col-lg-5 col-md-10 col-sm-10", { activeForm: isShowModal })}>

                <form onSubmit={handleSubmit(handleUpload)} className="content__employee-formInput">

                    <div className="content__employee-formTitle">
                        <h2>{editTingEmployee ? "Chỉnh Sửa Nhân Viên" :"Thêm Mới Nhân viên"} </h2>
                        <AiFillCloseCircle size={20} onClick={handleCloseForm}/>
                    </div>
                    <div className="content__employee-group">
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="name"> Tên Nhân viên</label>
                            <input type="text" name="name" id="name" defaultValue={inputs.name} ref={register} placeholder="Họ tên" />
                            {errors.name && errors.name.type === "required" ? <p>{errors.name.type === "required" && "Bạn chưa nhập Tên"}</p> : null}
                            {errors.name && errors.name.type === "min" ? <p>{errors.name.type === "min" && "Tên ít nhất có 3 ký tự"}</p> : null}
                            {errors.name && errors.name.type === "max" ? <p>{errors.name.type === "max" && "Tên không được quá 20 ký tự"}</p> : null}
                        </div>
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="birthday">Ngày sinh</label>
                            <input type="date" name="birthday" defaultValue={inputs.birthday} id="birthday" ref={register} />
                            {errors.birthday && errors.birthday.type === "required" ? <p>{errors.birthday.type === "required" && "Bạn chưa nhập ngày sinh"}</p> : null}

                        </div>
                    </div>
                    <div className="content__employee-group">
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="cardId">Số chứng minh thư</label>
                            <input type="number" name="cardId" id="cardId" defaultValue={inputs.cardId} ref={register} placeholder="Số chứng minh thư" />
                            {errors.cardId && errors.cardId.type === "required" ? <p>{errors.cardId.type === "required" && "Bạn chưa nhập số chứng minh thư"}</p> : null}
                            {errors.cardId && errors.cardId.type === "min" ? <p>{errors.cardId.type === "min" && "Số chứng minh thư phải ít nhất có 9 ký tự "}</p> : null}
                        </div>
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input type="number" name="phone" id="phone" defaultValue={inputs.phone} ref={register} placeholder="Số điện thoại" />
                            {errors.phone && errors.phone.type === "required" ? <p>{errors.phone.type === "required" && "Bạn chưa nhập số điện thoại"}</p> : null}
                            {errors.phone && errors.phone.type === "min" ? <p>{errors.phone.type === "min" && "Số điện thoại ít nhất có 10 ký tự"}</p> : null}
                        </div>
                    </div>
                    <div className="content__employee-group">
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" defaultValue={inputs.email} id="email" ref={register} placeholder="Email" />

                            {errors.email && errors.email.type === "required" ? <p>{errors.email.type === "required" && "Bạn chưa nhập Email"}</p> : null}
                            {errors.email && errors.email.type === "email" ? <p>{errors.email.type === "email" && "Email không hợp lệ"}</p> : null}
                        </div>
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="pass">Mật khẩu</label>
                            <input type="password" name="pass" defaultValue={inputs.pass} id="pass" ref={register} placeholder="Mật khẩu" />
                            {errors.pass && errors.pass.type === "required" ? <p>{errors.pass.type === "required" && "Bạn chưa nhập password"}</p> : null}
                            {errors.pass && errors.pass.type === "min" ? <p>{errors.pass.type === "min" && "Mật khẩu ít nhất 6 ký tự"}</p> : null}
                        </div>
                    </div>
                    <div className="content__employee-group">
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="address">Địa chỉ</label>
                            <input type="text" name="address" id="address" defaultValue={inputs.address} ref={register} placeholder="Địa chỉ" />
                            <p>{errors.address && errors.address.type === "required" && "Bạn chưa nhập địa chỉ"}</p>
                        </div>
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="position">Chức vụ </label>
                            <input type="text" name="position" id="position" defaultValue={inputs.position} ref={register} placeholder="Chức vụ" />
                            {errors.position && errors.position.type === "required" ? <p>{errors.position.type === "required" && "Bạn chưa nhập chức vụ"}</p> : null}
                        </div>
                    </div>
                    <div className="content__employee-group">
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="gender">Giới tính?</label>

                            <select name="gender" id="gender" value={inputs.gender} onChange={handleOnChange} ref={register} >
                                <option value={true}>Nam</option>
                                <option value={false}>Nữ</option>
                            </select>
                        </div>
                        <div className="content__employee-formControl formControl">
                            <label htmlFor="vip">Có phải điểm danh ?</label>

                            <select name="vip" id="vip" value={inputs.vip} onChange={handleOnChange} ref={register}>
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
                                {image ? <img src={previewImage} alt="" style={{ width: "60px", height: "60px" }}></img> : "Chưa có ảnh nào"}
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
                        <button type="reset" onClick={handleCloseForm}>Trở về</button>
                        <button type="submit">{editTingEmployee ? "Chỉnh Sửa" : "Thêm Mới"}</button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default EmployeeModal;