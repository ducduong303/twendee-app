function Validation(values) {
    let err = {}
    if(!values.email){
        err.email = "Bạn Chưa Nhập Email";
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        err.email = "Email chưa hợp lệ";
    }

    if(!values.password){
        err.password ="Bạn Chưa Nhập Mật Khẩu"
    }else if(values.password.length < 6 ){
        err.password = "Mật khẩu phải có 6 ký tự trở lên"
    }
    return err
}

export default Validation;