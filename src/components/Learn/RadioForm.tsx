import React from 'react';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from '@mui/material/Box';

import s from './Learn.module.css'

type PropsType = {
    radioFromHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioForm: React.FC<PropsType> = ({radioFromHandler}) => {
    return (
        <Box>
            <FormControl>
                <RadioGroup
                    className={s.learn_radio_block}
                    aria-labelledby="radio-form-grade"
                    defaultValue="1"
                    name="radio-buttons-group"
                    onChange={radioFromHandler}>
                    <FormControlLabel value="1" control={<Radio/>} label="Did not know"/>
                    <FormControlLabel value="2" control={<Radio/>} label="Forgot"/>
                    <FormControlLabel value="3" control={<Radio/>} label="A lot of thought"/>
                    <FormControlLabel value="4" control={<Radio/>} label="Сonfused"/>
                    <FormControlLabel value="5" control={<Radio/>} label="Knew the answer"/>

                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default RadioForm;