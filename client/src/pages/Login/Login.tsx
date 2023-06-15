import React from 'react';
import styles from './Login.module.css';

const Login = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <div className={styles.modalSection}>
                    <label>Enter your name</label>
                    <input type="text"/>
                    <button>Enter room</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
