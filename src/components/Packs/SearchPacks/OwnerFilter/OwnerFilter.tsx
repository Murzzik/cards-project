import React from 'react';
import style from '../SearchParameters.module.css';
import {Button, ButtonGroup} from '@material-ui/core';

const OwnerFilter: React.FC = () => {
    return (
        <div className={style.owner_filter}>
            <h3>Show packs cards</h3>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>My</Button>
                <Button>All</Button>
            </ButtonGroup>
        </div>
    );
};

export default OwnerFilter;