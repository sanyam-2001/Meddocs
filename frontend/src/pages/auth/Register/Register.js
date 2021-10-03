import React from 'react';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import PassTextField from '../../../utils/PassTextField/PassTextField'
import styles from './Register.module.css'
const Register = () => {
    const history = useHistory();
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        confirmPassword: "",
    });
    const [formError, setFormError] = React.useState({
        email: '',
        password: '',
        confirmPassword: "",
    });
    const [loading, setLoading] = React.useState(false);
    const validate = () => {
        let value = true;
        let err = { email: false, password: false }
        //eslint-disable-next-line
        let isEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        setFormError({ ...err });
        if (formData.password.length < 6) {
            value = false;
            err.password = "Password should be atleast 6 charactors"
        }
        if (!isEmail.test(formData.email)) {
            err.email = 'Enter valid email'
            value = false;
        }

        if (formData.password !== formData.confirmPassword) {
            console.log(formData)
            err.password = 'Enter Same Password'
            value = false;
        }

        setFormError({ ...err });
        return value;
    }
    const onSubmit = () => {
        if (validate()) {
            setLoading(true);
            axios({
                method: "POST",
                url: "/auth/signup",
                data: {
                    ...formData,
                }
            }).then(res => {
                if (res.data.statusCode === 200) {
                    toast('Signed Up')
                    localStorage.setItem("token", res.data.data.token)
                    localStorage.setItem('uuid', res.data.data.UID)
                    history.push('/dashboard')
                } else {
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
                if(err){
                    toast(err);
                }
                else{
                    toast('Server Error')
                }
            });
        }
    }
    return (
        <div className={styles.mainDiv}>
            <div className={styles.signUpCard}>
                <h1>Register</h1>

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
                <PassTextField
                    variant="outlined"
                    fullWidth
                    label="Confirm Password"
                    className={styles.textField}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    error={formError.confirmPassword?true:false}
                    helperText={formError.confirmPassword}
                />

                <Button variant="contained" onClick={onSubmit}>Register</Button>
                <p className='changePage'>
                    Already have an account? <Link to='/login'>Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;