import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import Modal from "react-modal";
import { modalCreateLogin } from "./modalStyle.js"
import LoginRegister from "../../screens/loginRegister/LoginRegister.js"
import { Link } from 'react-router-dom';

import "./header.css"


const Header = (props) => {
    /**
     * set state variables
     */
    const [isOpen, setIsOpen] = useState(false);
    const [buttonValue, setButtonValue] = useState("LOGIN");

    /**
     * set function is used to open close modal popup for login/register
     */
    function toggleModal() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const userDetails = sessionStorage.getItem("user-details");
        if (userDetails && JSON.parse(userDetails).id) {
            setButtonValue("LOGOUT");
        }
    }, [buttonValue])

    /**
     * clear session data if user clicks on logout and redirect to home
     */
    const handleLogout = () => {
        sessionStorage.removeItem('access-token');
        sessionStorage.removeItem('user-details');
        setButtonValue("LOGIN");
    }



    return (
        <Fragment>
            <div className="header">
                <img className="logo" src={logo} alt="My logo" />
                {buttonValue === "LOGIN" ?
                    <Button className="login-btn" variant="contained" name="login" onClick={toggleModal}>{buttonValue}</Button>
                    : <Link to="/"><Button className="login-btn" variant="contained" name="login" onClick={handleLogout}>{buttonValue}</Button></Link>
                }
                {props.showBookShowButton && buttonValue === "LOGIN" ?
                    <Button className="login-btn" variant="contained" onClick={() => toggleModal()} color="primary">Book Show</Button>
                    : ""}
                {
                    props.showBookShowButton && buttonValue === "LOGOUT" && props.id ?
                        <Link to={"/bookshow/" + props.id}>
                            <Button className="login-btn" variant="contained" color="primary">
                                Book Show
                            </Button>
                        </Link> : ""
                }
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                style={modalCreateLogin} ariaHideApp={false} scrollable
            >
                <LoginRegister setButtonValue={setButtonValue} onClickClose={toggleModal} {...props}></LoginRegister>
            </Modal>
        </Fragment>
    )

}

export default Header;