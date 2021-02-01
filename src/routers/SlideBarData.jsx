import React from 'react';
import { BiCalendarEdit ,BiChevronRight ,BiChevronDown,BiWifi0 ,BiCalendar,BiHistory} from 'react-icons/bi';
import {AiOutlineFieldTime,AiOutlineHome} from 'react-icons/ai';
import {FiMail} from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
export const SlideBarDataAdmin = [
    {
        id:uuidv4(),
        title:"ADMIN",
        path:"/admin",
        icon: <AiOutlineHome/>,
        class:"adminActive",
        classActive:"contentActive"
    },
    {
        id:uuidv4(),
        title: "Quản lý nhân viên",
        path:"/admin/quanlynhanvien",
        icon: <BiCalendarEdit/>
    },
    {
        id:uuidv4(),
        title:"Quản lý chấm công",
        path:"/admin/quanlychamcong/theongay",
        icon: <AiOutlineFieldTime/>,
        iconOpen: <BiChevronDown/> ,
        iconClose:<BiChevronRight/>,
        subNav:[
            {
                id:uuidv4(),
                title:"Theo ngày",
                path:"/admin/quanlychamcong/theongay",
                icon:  <BiWifi0/>,
            },
            {
                id:uuidv4(),
                title:"Theo tháng",
                path:"/admin/quanlychamcong/theothang",
                icon:  <BiWifi0/>,
            },

        ]
    },
    {
        id:uuidv4(),
        title:"Quản lý đơn từ",
        path:"/admin/quanlydontu",
        icon: <FiMail/>
    },
]
    
export const SlideBarDataUser = [
    {
        id:uuidv4(),
        title:"USER",
        path:"/users",
        class:"adminActive",
        classActive:"contentActive",
        icon: <AiOutlineHome/>,
    },
    {
        id:uuidv4(),
        title:"Điểm danh",
        path:"/users/diemdanh",
        icon: <BiCalendar/>
    },
    {
        id:uuidv4(),
        title:"Lịch sử điểm danh ",
        path:"/users/lichsudiemdanh",
        icon: <BiHistory/>
    },
    {
        id:uuidv4(),
        title:"Đơn từ",
        path:"/users/dontu",
        icon:<FiMail/>,
    },
    {
        id:uuidv4(),
        title:"Cập nhật thông tin",
        path:"/users/capnhatthongtin",
        icon:<BiCalendarEdit/>
    },
]
