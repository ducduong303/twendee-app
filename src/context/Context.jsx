import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from "query-string";
import UseFindIndex from "../hooks/UseFindIndex";
import CallApi from '../utils/CallApi';
export const ContextProvider = createContext();
function Context(props) {
    const history = useHistory('');
    const [employee, setEmployee] = useState([]);
    const [isLogin, setIsLogin] = useState(true)
    const [editTingEmployee, setEditTingEmployee] = useState(null)
    // Xử lý sự kiện ToogleNav
    const [isShowNavBar, setIsShoNavBar] = useState(true);

    const handleToggleShowNavBar = () => {
        setIsShoNavBar(!isShowNavBar)
    }

    // Xử lý phân trang

    const [filters, setFilters] = useState({
        limit: 5,
        page: 0,
        // search:''
    })
    const handlePageChange = (newPage) => {
        console.log(newPage);
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
    // useEffect(() => {
    //     const param = queryString.stringify(filters);
    //     CallApi(`admin/staffs?${param}`, "GET", null)
    //         .then(res => {
    //             console.log(res);
    //             setEmployee([...res.data]);
    //         })
    // }, [filters])

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
                    if (res.data.mess) {
                        alert("email Đã tồn tại")
                    }
                    else {
                        setEmployee([...employee, res.data]);
                    }
                })


        }
        else {
            CallApi(`admin/staffs/${data.id}`, "POST", {
                ...newData
            })
                .then(res => {
                    var index = UseFindIndex(employee, data.id);
                    if (index !== -1) {
                        employee[index] = res.data
                        setEmployee([...employee])
                        setEditTingEmployee(null)
                    }
                })
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
    const [isCheckin, setIsCheckin] = useState(null);
    const handleCheckin = () => {
        // CallApi("checkin","POST",{

        // })
        //     .then(res =>{
        //         console.log("res",res);
        //         setIsCheckin(true)
        //     })
        setIsCheckin(true)

    }
    const handleCheckout = () => {
        setIsCheckin(false)
        setTimeout(() => {
            setIsCheckin(null)
        }, 2000)
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
                    console.log("res", res);
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
        console.log(data);
        switch (request) {
            case "1":
                console.log("day off");
                CallApi("send-request/out-side", "POST", {
                    email: data.email,
                    endDate: data.endDate,
                    startDate: data.startDate,
                    reason: data.reason
                })
                    .then(res => {
                        console.log("res",res);
                        
                    })

                break;
            case "2":
                console.log("quên checkout");
                break;
            case "3":
                console.log("về sớm về muộn");
                break;
            case "4":
                console.log("đi out site");
                break;
            default:
                return request
        }
    }
    // Xử lý sự kiện logout
    const handleLogOut = () => {
        localStorage.removeItem("token")
        history.push("/")
        setIsLogin(false)
    }
    return (
        <ContextProvider.Provider value={
            {
                isLogin: isLogin,
                handleLogOut: handleLogOut,
                isShowNavBar: isShowNavBar,
                handleToggleShowNavBar: handleToggleShowNavBar,

                subMenu: subMenu,
                seleced: seleced,

                isShowModal: isShowModal,
                handleToggleShowModal: handleToggleShowModal,

                employee: employee,
                handleAddEmployee: handleAddEmployee,
                handleDeleteEmployee: handleDeleteEmployee,
                handleEditEmployee: handleEditEmployee,
                editTingEmployee: editTingEmployee,


                isCheckin: isCheckin,
                handleCheckin: handleCheckin,
                handleCheckout: handleCheckout,

                handleActive: handleActive,
                showSubNav: showSubNav,
                handleLoginUser: handleLoginUser,

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