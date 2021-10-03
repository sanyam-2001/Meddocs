import React from 'react';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import PassTextField from '../../../utils/PassTextField/PassTextField'
import styles from './Login.module.css'
const Login = () => {
    const history = useHistory();
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });
    const [formError, setFormError] = React.useState({
        email: false,
        password: false,
    });
    const [loading, setLoading] = React.useState(false);
    const validate = () => {
        let value = true;
        let err = { email: false, password: false }
        let isEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        setFormError({ ...err });
        if (formData.password.length < 6) {
            value = false;
            err.password = "Password should be atleast 8 charactors"
        }
        if (!isEmail.test(formData.email)) {
            err.email = 'Enter valid email'
            value = false;
        }
        setFormError({ ...err });
        return value;
    }
    const onSubmit = () => {
        if (validate()) {
            setLoading(true);
            axios({
                method: "post",
                url: "/auth/login",
                data: {
                    ...formData,
                }
            }).then(res => {
                console.log(res);
                if (res.data.statusCode === 200) {
                    toast('Login')
                    localStorage.setItem("token", res.data.data.token)
                    localStorage.setItem('uuid', res.data.data.UID)
                    history.push('/dashboard')
                }
                else {
                    if(res.data.error){
                        res.data.error.forEach(e=>{
                            toast(e);
                        })
                    }
                    else{
                        toast('Server Error')
                    }
                }
                setLoading(false);
            }).catch(err => {
                console.log(err);
                return toast('Some error occured in approved Api.', {
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                })
            });
        }
    }
    return (
        <div className={styles.mainDiv}>
            <div className={styles.signUpCard}>
                <h1>Login</h1>

                <TextField
                    variant="outlined"
                    fullWidth
                    label="Enter your email id"
                    className={styles.textField}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={formError.email?true:false}
                    helperText={formError.email}
                />

                <PassTextField
                    variant="outlined"
                    fullWidth
                    label="Enter your password"
                    className={styles.textField}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    error={formError.password?true:false}
                    helperText={formError.password}
                />
                <Button variant="contained" onClick={onSubmit}>Login</Button>
                <p className='changePage'>
                    Need an account? <Link to='/register'>Register Now</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;