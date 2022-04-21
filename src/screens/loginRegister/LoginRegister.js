import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';


import "./loginRegister.css"

const LoginRegister = (props) => {
    /**
     * set state variables
     */
    const [value, setValue] = React.useState(0);
    const [clicked, setClicked] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [responseText, setResponseText] = useState("");
    const [responseStyle, setResponseStyle] = useState("");
    const [responseTextRegister, setResponseTextRegister] = useState("");
    const [responseTextRegisterStyle, setResponseTextRegisterStyle] = useState("");

    /**
     * this function is used to change the view tab 
     * login-0/register-1
     */
    const handleChange = (event, newValue) => {
        setClicked(false);
        setValue(newValue);
    };

    /**
     * this function is used to make an api call for logging in user
     */
    const handleLoginUser = async () => {
        setClicked(true);
        if (!username || !password) {
            return;
        }
        try {
            const rawRes = await fetch(props.baseUrl + "auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Basic ${window.btoa(`${username}:${password}`)}`
                },
            });
            const response = await rawRes.json();
            if (response.id) {
                setResponseText("");
                sessionStorage.setItem("user-details", JSON.stringify(response));
                sessionStorage.setItem("access-token", rawRes.headers.get("Access-token"));
                props.setButtonValue("LOGOUT");
                props.onClickClose();

            } else {
                setResponseText(response.message || "Something went wrong")
                setResponseStyle("red")
            }


        } catch (err) {
            alert("Something Went Wrong \n" + err);
        }

    }
    /**
     * this function is used to make an api call for regertering an user
     */
    const handleRegister = () => {
        setClicked(true);
        if (!email || !firstname || !lastname || !contactNo || !password) {
            return;
        }

        fetch(props.baseUrl + "signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                "email_address": email,
                "first_name": firstname,
                "last_name": lastname,
                "mobile_number": contactNo,
                "password": password
            }),
        }).then((response) => response.json())
            .then((response) => {
                if (response.status === "ACTIVE") {
                    setResponseTextRegister("Registration Successfull. Please Login!")
                    setResponseTextRegisterStyle("success");
                } else {
                    setResponseTextRegister(response.message);
                    setResponseTextRegisterStyle("red");
                }
            })

    }
    /**
     * set initial props for tab switching - login/register
     */
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Login" {...a11yProps()} />
                <Tab label="Register" {...a11yProps()} />
            </Tabs>
            {value === 0 ?
                <div className="modal">
                    <br></br>
                    <FormControl>
                        <InputLabel htmlFor="username">Username*</InputLabel>
                        <Input
                            required
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {!username && clicked ? <FormHelperText>
                            <span className="red">Required</span>
                        </FormHelperText> : ""}
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="password">Password*</InputLabel>
                        <Input
                            required
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!password && clicked ? <FormHelperText>
                            <span className="red">Required</span>
                        </FormHelperText> : ""}
                    </FormControl>
                    <br></br>
                    <FormControl>
                        {responseText && clicked ? <FormHelperText>
                            <span className={responseStyle}>{responseText}</span>
                        </FormHelperText> : ""}
                    </FormControl>
                    <br></br>
                    <Button variant="contained" color="primary" onClick={handleLoginUser}>Login</Button>
                </div>
                :
                <div>
                    <FormControl>
                        <InputLabel htmlFor="firstname">First Name*</InputLabel>
                        <Input
                            required
                            id="firstname"
                            name="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        {!firstname && clicked ? <FormHelperText>
                            <span className="red">Required</span>
                        </FormHelperText> : ""}
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="lastname">Last Name*</InputLabel>
                        <Input
                            required
                            id="lastname"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        {!lastname && clicked ? <FormHelperText>
                            <span className="red">Required</span>
                        </FormHelperText> : ""}
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="email">Email*</InputLabel>
                        <Input
                            required
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {!email && clicked ? <FormHelperText>
                            <span className="red">Required</span>
                        </FormHelperText> : ""}
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            required
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!password && clicked ? <FormHelperText>
                            <span className="red">Required</span>
                        </FormHelperText> : ""}
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="contactNo">Contact No.*</InputLabel>
                        <Input
                            required
                            id="contactNo"
                            name="contactNo"
                            type="contactNo"
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                        />
                        {!contactNo && clicked ? <FormHelperText>
                            <span className="red">Required</span>
                        </FormHelperText> : ""}
                    </FormControl>
                    <br></br>
                    <FormControl>
                        {responseTextRegister && clicked ? <FormHelperText>
                            <span className={responseTextRegisterStyle}>{responseTextRegister}</span>
                        </FormHelperText> : ""}
                    </FormControl>
                    <br></br>
                    <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
                </div>}
        </div>
    )
}

export default LoginRegister;