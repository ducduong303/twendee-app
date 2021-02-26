import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from "query-string";
import UseFindIndex from "../hooks/UseFindIndex";
import CallApi from '../utils/CallApi';
export const ContextProvider = createContext();
function Context(props) {
    const history = useHistory('');
    const [user, setUser] = useState(null)
    const [employee, setEmployee] = useState([]);
    const [totalEmployee, setTotalEmployee] = useState([])
    const [totalRequest, settotalRequest] = useState([])

    const [isLogout, setIsLogout] = useState(false)
    const handleOpenLogout = () => {
        setIsLogout(!isLogout)
    }
    const handleCloseLogout = () => {
        setIsLogout(false)
    }

    const token = localStorage.getItem("token")

    const [isLogin, setIsLogin] = useState(false);

    const [editTingEmployee, setEditTingEmployee] = useState(null)
    // Xử lý sự kiện ToogleNav
    const [isShowNavBar, setIsShoNavBar] = useState(true);

    const handleToggleShowNavBar = () => {
        setIsShoNavBar(!isShowNavBar)
        setIsLogout(false)
    }

    // Xử lý requesUser
    const [requestUser, setRequestUser] = useState([])
    const [filterRequest, setFilterRequest] = useState({
        isAccepted: -1,
        limit: 5,
        page: 0,
        type: 0,
    })
    const handleChangeFilterRequest = (filter) => {
        setFilterRequest({
            ...filterRequest,
            isAccepted: filter.isAccepted,
            type: filter.type
        })
    }
    const handleChangePageRequest = (newPage) => {
        setFilterRequest({
            ...filterRequest,
            page: newPage
        })
    }

    // Get Requests
    useEffect(() => {
        const param = queryString.stringify(filterRequest)
        CallApi(`admin/requests?${param}`, "GET", null)
            .then(res => {
                setRequestUser([...res.data])
            })

    }, [filterRequest])

    // Xử lý action Request
    const findIndexRequest = (data, id) => {
        var index = -1;
        data.forEach((item, i) => {
            if (item.requestId === id) {
                index = i
            }
        })
        return index
    }
    const handleAcceptRequest = (id) => {
        var index = findIndexRequest(requestUser, id);
        var isAccept = requestUser[index].isAccept;
        if (isAccept === null) {
            CallApi(`admin/accept/${id}`, "GET", null)
                .then(res => {
                    if (res.data.mess) {
                        alert("Accept thành công")
                    }
                })
            requestUser[index] = {
                ...requestUser[index],
                isAccept: true
            }
            setRequestUser([...requestUser])
        } else {
            alert("đã phê duyệt")
        }
    }
    const handleRefuseRequest = (id) => {
        var index = findIndexRequest(requestUser, id);
        var isAccept = requestUser[index].isAccept;
        if (isAccept === null) {
            CallApi(`admin/refuse/${id}`, "GET", null)
                .then(res => {
                    if (res.data.mess) {
                        alert("Refuse thành công")
                    }
                })
            requestUser[index] = {
                ...requestUser[index],
                isAccept: false
            }
            setRequestUser([...requestUser])
        } else {
            alert("đã phê duyệt")
        }
    }
    const handleDeleteRequest = (id) => {
        if (id) {
            CallApi(`admin/requests/${id}`, "DELETE", null)
                .then(res => {
                    const data = requestUser.filter(item => item.requestId !== id);
                    setRequestUser([...data])
                    alert("Delete thành công")
                    let page;
                    if (requestUser.length === 1) {
                        page = filterRequest.page - 1
                    } else {
                        page = filterRequest.page
                    }
                    setFilterRequest({
                        ...filterRequest,
                        limit: 5,
                        page: page
                    })
                })
        }
    }
    // Xử lý sự kiện lấy thông tin user
    useEffect(() => {
        const configToken = localStorage.getItem("token")
        if (localStorage.getItem("token")) {
            CallApi("user", "POST", {
                token: configToken
            })
                .then(res => {
                    setUser(res.data)
                })
        }
        return () => {

        }
    }, [token, employee])

    // Xử lý phân trang Employee
    const [filtersEmpoyee, setFiltersEmpoyee] = useState({
        limit: 5,
        page: 0,
        search: ''
    })
    const handlePageChangeEmpoyee = (newPage) => {
        setFiltersEmpoyee({
            ...filtersEmpoyee,
            page: newPage
        })
    }
    // search employee
    const handleSearch = (value) => {
        setFiltersEmpoyee({
            ...filtersEmpoyee,
            page: 0,
            search: value.search
        })
    }

    // Xử lý sự kiện getData Employee
    useEffect(() => {
        const param = queryString.stringify(filtersEmpoyee);
        CallApi(`admin/staffs?${param}`, "GET", null)
            .then(res => {
                // console.log("resdata", res);
                setEmployee([...res.data]);
            })
    }, [filtersEmpoyee])

    useEffect(() => {
        CallApi(`admin/staffs`, "GET", null)
            .then(res => {
                setTotalEmployee([...res.data])
            })
    }, [employee])

    useEffect(() => {
        CallApi(`admin/requests?isAccepted=-1&type=0`, "GET", null)
            .then(res => {
                settotalRequest([...res.data])
            })
    }, [requestUser])


    // Xử lý sự kiện active và show Submenu
    const [subMenu, setSubMenu] = useState(false);
    const [seleced, setSeleced] = useState(null)
    const handleActive = (id) => {
        if (seleced === id) {
            setSeleced(null)
        }
        setSeleced(id)
        setIsLogout(false)
    }
    const showSubNav = () => {
        setSubMenu(!subMenu);
        setIsLogout(false)
    }

    // Xử lý sự kiện Modal
    const [isShowModal, setIsShowModal] = useState(false);

    const handleToggleShowModal = () => {
        setIsShowModal(!isShowModal);
        // setEditTingEmployee(null)
        setIsLogout(false)
    }

    const handleCloseForm = () => {
        setIsShowModal(false)
        setEditTingEmployee(null)
    }

    // Xử lý sự kiện addEmployee và UpdateEmployee
    const handleAddEmployee = (data) => {
        const day = Date.parse(data.birthday);
        const newData = {
            email: data.email,
            pass: data.pass,
            name: data.name,
            phone: data.phone,
            birthday: day,
            cardId: data.cardId,
            avatar: data.avatar,
            address: data.address,
            gender: data.gender,
            position: data.position,
            vip: data.vip
        }
        if (data.id === "") {
           
            CallApi("admin/staffs", "POST", {
                ...newData
            })
                .then(res => {
                    // console.log("res", res);
                    if (res.data.mess) {
                        alert("email này  Đã tồn tại")
                        return
                    }
                    setEmployee([...employee, res.data]);
                    const param = queryString.stringify(filtersEmpoyee);
                    CallApi(`admin/staffs?${param}`, "GET", null)
                        .then(res => {
                            setEmployee([...res.data]);
                        })
                })
            handleCloseForm();
        }
        else {
            // console.log("update", newData);
            CallApi(`admin/staffs/${data.id}`, "POST", {
                ...newData
            })
                .then(res => {
                    if (res.data.mess) {
                        alert("Email không thể chỉnh sửa")
                        return;
                    }
                    var index = UseFindIndex(employee, data.id);
                    if (index !== -1) {
                        employee[index] = res.data
                        setEmployee([...employee])
                        setEditTingEmployee(null)
                        // handleCloseForm();
                        // handleToggleShowModal()
                    }
                })
            handleCloseForm();
        }

    }
    // Xử lý sự kiện Xóa Employee
    const handleDeleteEmployee = (id) => {
        CallApi(`admin/staffs/${id}`, "DELETE")
            .then(res => {
                const data = employee.filter(item => item.userId !== id);
                setEmployee([...data])
                let page;
                if (employee.length === 1) {
                    page = filtersEmpoyee.page - 1
                } else {
                    page = filtersEmpoyee.page
                }
                setFiltersEmpoyee({
                    ...filtersEmpoyee,
                    limit: 5,
                    page: page
                })
            })
    }
    // Xử lý sự kiện Edit Employee
    const handleEditEmployee = (data) => {
        handleToggleShowModal()
        setEditTingEmployee(data)
    }

    // Xử lý sự kiện Điểm danh
    const handleTimeKeeping = (email, type) => {
        switch (type) {
            case 1:
                CallApi("checkin", "POST", {
                    email: email
                }).then(res => {
                    alert(res.data.mess)
                })
                break;
            case 2:
                CallApi("checkout", "POST", {
                    email: email
                }).then(res => {
                    alert(res.data.mess)
                })
                break;
            default:
                return;
        }
    }

    // Xử lý sự kiện login
    const handleLoginUser = (data) => {
        if (data.email && data.password) {
            // history.push("/admin")
            CallApi("login", "POST", {
                username: data.email,
                password: data.password
            })
                .then(res => {
                    if (res) {
                        localStorage.setItem("token", res.data.accessToken)
                        const role = res.data.role[0];
                        if (role === "ROLE_ADMIN") {
                            history.push("/admin")
                            setIsLogin(true)
                        } else {
                            history.push("/users")
                            setIsLogin(true)
                        }
                    }

                })
        }
    }

    // Xử lý sự kiện Update profile
    const handleUpdateProfile = (data, id) => {
        const day = Date.parse(data.birthday);
        const newProfile = {
            pass: data.pass,
            name: data.name,
            phone: data.phone,
            birthday: day,
            email: data.email,
            cardId: data.cardId,
            avatar: data.avatar,
            address: data.address,
            gender: data.gender,
        }
        // console.log("newprofile", newProfile);
        CallApi(`update/${id}`, "POST", {
            ...newProfile
        }).then(res => {
            // console.log("resUpdate", res);
            var index = UseFindIndex(employee, id);
            if (index !== -1) {
                employee[index] = res.data
                setEmployee([...employee])
            }
        })
    }
    // Xử lý sự kiện quên mật khẩu
    const handleForgotPassWord = (data) => {
        const newData = {
            email: data.email
        }
        CallApi("forgotPassword", "POST", {
            ...newData
        })
            .then(res => {
                if (res.data.mess === "successful") {
                    alert("Vui lòng kiểm tra email của bạn để nhận mật khẩu mới")
                    history.push("/")
                }
                else {
                    alert("Email và password không tồn tại ")
                }
            })
    }

    // Xử lý sự kiện đơn từ
    const handleUsersRequest = (data, request) => {
        switch (request) {
            case "1":
                const endDateFormat = Date.parse(data.endDate)
                const startDateFormat = Date.parse(data.startDate)
                const dayOffRequets = {
                    email: data.email,
                    endDate: endDateFormat,
                    startDate: startDateFormat,
                    reason: data.reason
                }
                CallApi("send-request/day-off", "POST", {
                    ...dayOffRequets
                })
                    .then(res => {
                        setRequestUser([...requestUser, res.data])
                        alert("Thành công")
                        const param = queryString.stringify(filterRequest)
                        CallApi(`admin/requests?${param}`, "GET", null)
                            .then(res => {
                                setRequestUser([...res.data])
                            })                
                    })

                break;
            case "2":
                const date = Date.parse(data.startDate)
                const checkout = {
                    email: data.email,
                    date: date
                }
                CallApi("send-request/check-out", "POST", {
                    ...checkout
                })
                    .then(res => {
                        setRequestUser([...requestUser, res.data])
                        alert("Đã gửi thành công ")
                        const param = queryString.stringify(filterRequest)
                        CallApi(`admin/requests?${param}`, "GET", null)
                            .then(res => {
                                setRequestUser([...res.data])
                            })      

                    })
                break;
            case "3":
                let dateLateEarly = Date.parse(data.startDate)
                var timeEarly_Late = {
                    email: data.email,
                    date: dateLateEarly,
                    reason: data.reason,
                    timeEarly: data.timeEarly,
                    timeLate: data.timeLate
                }
                CallApi("send-request/late-early", "POST", {
                    ...timeEarly_Late
                })
                    .then(res => {
                        setRequestUser([...requestUser, res.data])
                        alert("Đã gửi thành công ")
                        const param = queryString.stringify(filterRequest)
                        CallApi(`admin/requests?${param}`, "GET", null)
                            .then(res => {
                                setRequestUser([...res.data])
                            })      
                    })
                break;
            case "4":
                let endDate = Date.parse(data.endDate)
                let startDate = Date.parse(data.startDate)
                let onSite = {
                    email: data.email,
                    endDate: endDate,
                    startDate: startDate,
                    reason: data.reason
                }
                CallApi("send-request/out-side", "POST", {
                    ...onSite
                })
                    .then(res => {
                        setRequestUser([...requestUser, res.data])
                        alert("Đã gửi thành công ")
                        const param = queryString.stringify(filterRequest)
                        CallApi(`admin/requests?${param}`, "GET", null)
                            .then(res => {
                                setRequestUser([...res.data])
                            })      
                    })
                break;
            default:
                return request
        }
    }

    // Xử lý sự kiện logout
    const handleLogOut = () => {
        localStorage.removeItem("token")
        localStorage.clear()
        history.push("/")
        setSubMenu(false)
        setIsLogin(false)
        setSeleced(null)
        handleCloseLogout();
        setIsShoNavBar(true)
    }
    return (
        <ContextProvider.Provider value={
            {
                user: user,
                isLogin: isLogin,
                handleLoginUser: handleLoginUser,
                handleForgotPassWord: handleForgotPassWord,
                handleUpdateProfile: handleUpdateProfile,
                handleLogOut: handleLogOut,
                isShowNavBar: isShowNavBar,
                handleToggleShowNavBar: handleToggleShowNavBar,
                handleCloseForm: handleCloseForm,
                // xử lý menu nav
                subMenu: subMenu,
                seleced: seleced,
                isLogout: isLogout,
                handleOpenLogout: handleOpenLogout,
                handleCloseLogout: handleCloseLogout,

                isShowModal: isShowModal,
                handleToggleShowModal: handleToggleShowModal,
                handleTimeKeeping: handleTimeKeeping,


                employee: employee,
                handleAddEmployee: handleAddEmployee,
                handleDeleteEmployee: handleDeleteEmployee,
                handleEditEmployee: handleEditEmployee,
                editTingEmployee: editTingEmployee,
                totalEmployee: totalEmployee,
                handleActive: handleActive,
                showSubNav: showSubNav,


                // handle change page
                handlePageChangeEmpoyee: handlePageChangeEmpoyee,
                filtersEmpoyee: filtersEmpoyee,
                handleSearch: handleSearch,

                // Xử lý request
                requestUser: requestUser,
                handleUsersRequest: handleUsersRequest,
                handleAcceptRequest: handleAcceptRequest,
                handleRefuseRequest: handleRefuseRequest,
                handleDeleteRequest: handleDeleteRequest,
                handleChangeFilterRequest: handleChangeFilterRequest,
                totalRequest: totalRequest,
                filterRequest: filterRequest,
                handleChangePageRequest: handleChangePageRequest,
            }
        }>
            {props.children}
        </ContextProvider.Provider>
    );
}

export default Context;