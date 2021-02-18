import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from "query-string";
import UseFindIndex from "../hooks/UseFindIndex";
import CallApi from '../utils/CallApi';
// import moment from 'moment';
export const ContextProvider = createContext();
function Context(props) {
    const history = useHistory('');
    const [user, setUser] = useState(null)
    const [employee, setEmployee] = useState([]);
    const [requestsUser, setRequestsUser] = useState([])
    const token = localStorage.getItem("token")

    const [isLogin, setIsLogin] = useState(false);

    const [editTingEmployee, setEditTingEmployee] = useState(null)
    // Xử lý sự kiện ToogleNav
    const [isShowNavBar, setIsShoNavBar] = useState(true);

    const handleToggleShowNavBar = () => {
        setIsShoNavBar(!isShowNavBar)
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

    // Xử lý phân trang
    const [filters, setFilters] = useState({
        limit: 5,
        page: 0,
        // search:''
    })
    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage
        })

    }
    const handleSearch = (value) => {
        setFilters({
            ...filters,
            page: 0,
            search: value.search
        })
    }

    // Xử lý sự kiện getData Employee
    useEffect(() => {
        const param = queryString.stringify(filters);
        CallApi(`admin/staffs?${param}`, "GET", null)
            .then(res => {
                // console.log("resdata", res);
                setEmployee([...res.data]);
            })
    }, [filters])

    // Get data đơn từ 
    useEffect(() => {
        CallApi("admin/requests", "GET", null)
            .then(res => {
                setRequestsUser([...res.data])
            })
    },[])

    // Xử lý sự kiện active và show Submenu
    const [subMenu, setSubMenu] = useState(false);
    const [seleced, setSeleced] = useState(null)
    const handleActive = (id) => {
        if (seleced === id) {
            setSeleced(null)
        }
        setSeleced(id)
    }
    const showSubNav = () => {
        setSubMenu(!subMenu);
    }

    // Xử lý sự kiện Modal
    const [isShowModal, setIsShowModal] = useState(false);

    const handleToggleShowModal = () => {
        setIsShowModal(!isShowModal);
        // setEditTingEmployee(null)
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
            console.log("adđ", newData);
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
                    // handleCloseForm();

                })
            handleCloseForm();
        }
        else {
            console.log("update", newData);
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
            })
    }
    // Xử lý sự kiện Edit Employee
    const handleEditEmployee = (data) => {
        handleToggleShowModal()
        setEditTingEmployee(data)
    }

    // Xử lý sự kiện Điểm danh
    const handleTimeKeeping = (email, type) => {
        console.log("type", email);
        switch (type) {
            case 1:
                CallApi("checkin", "POST", {
                    email: email
                }).then(res => {
                    console.log("res", res);

                })
                break;
            case 2:
                CallApi("checkout", "POST", {
                    email: email
                }).then(res => {
                    console.log("res", res);

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
                    // console.log("resLogin", res);
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

                        if (res.data.mess) {
                            alert("Đã gửi thành công ")
                        }
                        console.log("resrequest", res);

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
                        if (res.data.mess) {
                            alert("Đã gửi thành công ")
                        }
                    })
                break;
            case "3":
                let timeLateFormat = Date.parse(data.timeLate)
                let timeEarly = Date.parse(data.timeEarly)
                var timeEarly_Late = {
                    email: data.email,
                    date: data.date,
                    reason: data.reason,
                    timeEarly: timeEarly,
                    timeLate: timeLateFormat
                }
                CallApi("send-request/late-early", "POST", {
                    ...timeEarly_Late
                })
                    .then(res => {
                        if (res.data.mess) {
                            alert("Đã gửi thành công ")
                        }
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
                        if (res.data.mess) {
                            alert("Đã gửi thành công ")
                        }
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
        setIsLogin(false)
    }
    return (
        <ContextProvider.Provider value={
            {
                user: user,
                isLogin: isLogin,
                handleLoginUser: handleLoginUser,
                handleLogOut: handleLogOut,
                requestsUser: requestsUser,
                isShowNavBar: isShowNavBar,
                handleToggleShowNavBar: handleToggleShowNavBar,
                handleCloseForm: handleCloseForm,
                // xử lý menu nav
                subMenu: subMenu,
                seleced: seleced,

                isShowModal: isShowModal,
                handleToggleShowModal: handleToggleShowModal,
                handleTimeKeeping: handleTimeKeeping,

                employee: employee,
                handleAddEmployee: handleAddEmployee,
                handleDeleteEmployee: handleDeleteEmployee,
                handleEditEmployee: handleEditEmployee,
                editTingEmployee: editTingEmployee,

                handleActive: handleActive,
                showSubNav: showSubNav,


                // handle change page
                handlePageChange: handlePageChange,
                filters: filters,
                handleSearch: handleSearch,

                handleUsersRequest: handleUsersRequest,
            }
        }>
            {props.children}
        </ContextProvider.Provider>
    );
}

export default Context;