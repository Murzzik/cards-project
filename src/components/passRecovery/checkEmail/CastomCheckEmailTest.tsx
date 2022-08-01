import React from 'react';
import checkEmail from '../../../assets/images/receiveEmail.png';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import style from '../../../styles/auth/Auth.module.css';

type CheckEmailPropsType = {
    recoveryEmail: string,
}

const CheckEmail: React.FC<CheckEmailPropsType> = ({ recoveryEmail }) => {

    const generatorLink = (recoveryEmail: string) => {
        const firstIndex = recoveryEmail.indexOf('@');
        const domain = recoveryEmail.slice(firstIndex);
        const endIndex = domain.indexOf('.');
        const trigger = domain.slice(0, endIndex);

        switch(trigger) {
            case '@gmail': {
                return <div className={style.email_link}>
                    <a href={'https://mail.google.com/mail/u/0/#inbox'} target="_blank">
                        <Button variant={'contained'}
                             color={'primary'}
                             className={style.auth_button}>
                        Check Email
                    </Button>
                    </a>
                </div>;
            }
            case '@yandex': {
                // return <a href={'https://mail.yandex.ru/?uid=1666858664#tabs/relevant'} target="_blank">Check Email</a>;
                return <div className={style.email_link}>
                    <a href={'https://mail.yandex.ru/?uid=1666858664#tabs/relevant'} target="_blank"> <Button
                        variant={'contained'} color={'primary'} className={style.auth_button}>
                        Check Email
                    </Button>
                    </a>
                </div>;
            }
            default :
                return '';
        }
    };

    const link = generatorLink(recoveryEmail);

    return (
        <div className={style.main_block}>
            <h2 className={style.checkEmailHead}>Check Email</h2>
            <img src={checkEmail} alt="" />
            <p className={style.checkEmail_opacity_text}>We’ve sent an Email with instructions to {recoveryEmail}</p>
            {link ?
                link :
                <NavLink to={'/authorization'}>
                    <Button variant={'contained'} color={'primary'} className={style.auth_button}>
                        Back to login
                    </Button>
                </NavLink>
            }

        </div>
    );
};

export default CheckEmail;