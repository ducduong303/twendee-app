
// import { useState, useEffect } from 'react';

// function UseForm(callbackData, validate) {
//     const [inputs, setInputs] = useState({
//         email: "",
//         password: "",
//     })
//     const [errors, setErrors] = useState({});
//     const handleChange = (e) => {
//         setInputs({
//             ...inputs,
//             [e.target.name]: e.target.value
//         })
//     }
//     const clearForm = () =>{
//         setInputs({
//             email:"",
//             password:""
//         })
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Check validate 
//         setErrors(validate(inputs));
//     }

//     // // Nếu không có lỗi thì truyền data về context
//     useEffect(() => {
//         if (Object.keys(errors).length === 0) {
//             callbackData(inputs);
//             clearForm()
//         }
//     }, [errors])
//     return { handleChange, inputs, handleSubmit, errors }

// }

// export default UseForm;