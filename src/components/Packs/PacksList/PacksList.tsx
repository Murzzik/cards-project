import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {deletePack, Pack, updatePackName} from '../../../store/reducers/packs-reducer';
import {NavLink, useSearchParams} from 'react-router-dom';
import {Pagination} from 'antd';
import SchoolIcon from '@mui/icons-material/School';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from '@material-ui/core';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {convertDate} from '../../../utilities/parsData';
import s from './PackList.module.css';
import {TableSortLabel} from '@mui/material';
import {useState} from 'react';
import PacksPaginationContainer from './PacksPaginationContainer';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type PackListPopsType = {
    packs: Pack[],
    isLoggedIn: boolean
}
type headCellsIDsType = 'name' | 'cardsCount' | 'lastUpdate' | 'createdBy' | 'actions'
type sortModeType = { sortBy: headCellsIDsType, direction: boolean }
type headCellsType = {
    id: headCellsIDsType
    label: string,
    align?: string,

}

export const PackList: React.FC<PackListPopsType> = ({packs, isLoggedIn}) => {
    const dispatch = useAppDispatch();

    const [sortMode, setSortMode] = useState<sortModeType>({sortBy: 'lastUpdate', direction: true});

    const [searchParameters] = useSearchParams();
    const myId = useAppSelector(state => state.auth.user._id);


    const owner = searchParameters.get('id');
    let userId = '';
    if (owner) {
        userId = owner;
    }

    const deletePackHandler = (id: string) => {
        dispatch(deletePack(id, userId));
    };

    const updatePackNameHandler = (id: string) => {
        const newPackName = 'Test for name change before modal implemented';
        dispatch(updatePackName(id, newPackName, userId));
    };

    const onSortModeChangeHandler = (id: headCellsIDsType) => {
//what?

        setSortMode({
            sortBy: id,
            direction: id === sortMode.sortBy ? !sortMode.direction : true
        });

    };

    const headCells: headCellsType[] = [
        {
            id: 'name',
            label: 'Name',
            align: 'left',

        },
        {
            id: 'cardsCount',
            label: 'Cards count',

        },
        {
            id: 'lastUpdate',
            label: 'last update',

        },
        {
            id: 'createdBy',
            label: 'Created by',

        },
        {
            id: 'actions',
            label: 'Actions',

        },

    ];

    return (
        <div>{packs.length > 0 ?
            <div>
                {!isLoggedIn ?
                    <h3 className={s.errorAuthText}>Ты не авторизирован, попробуй перезайти:)</h3>
                    :
                    <TableContainer component={Paper} style={{width: '80%', margin: '0 auto'}}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>


                                    {headCells.map(headCell => <TableCell
                                            key={headCell.id}
                                            // onClick={f => console.log(f.currentTarget.id)}
                                            // align={'right'}
                                            // padding={'normal'}
                                            // sortDirection={orderBy === headCell.id ? order : false}
                                            // style={{fontWeight: 'bold', width: headCell.width}}
                                        >
                                            <TableSortLabel
                                                disabled={headCell.id === 'actions'}
                                                active={headCell.id === sortMode.sortBy}
                                                direction={sortMode.direction ? 'asc' : 'desc'}
                                                onClick={() => onSortModeChangeHandler(headCell.id)}
                                            >
                                                {headCell.label}

                                            </TableSortLabel>
                                        </TableCell>
                                    )
                                    }

                                    {/*<StyledTableCell>*/}
                                    {/*    <span style={{cursor: 'pointer'}}>Name</span>*/}
                                    {/*</StyledTableCell>*/}
                                    {/*<StyledTableCell align="right">Cards</StyledTableCell>*/}
                                    {/*<StyledTableCell align="right">Last Update</StyledTableCell>*/}
                                    {/*<StyledTableCell align="right">Create By</StyledTableCell>*/}
                                    {/*<StyledTableCell align="right">Action</StyledTableCell>*/}

                                    {/*<TableCell>*/}
                                    {/*    <span style={{cursor: 'pointer'}}>Name</span>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell align="right">Cards</TableCell>*/}
                                    {/*<TableCell align="right">Last Update</TableCell>*/}
                                    {/*<TableCell align="right">Create By</TableCell>*/}
                                    {/*<TableCell align="right">Action</TableCell>*/}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {packs.map((pack: Pack, index) => (
                                    <StyledTableRow key={pack._id}>
                                        <TableCell component="th" scope="row">
                                            <NavLink to={'/packs/' + pack._id}>{pack.name}</NavLink>
                                        </TableCell>
                                        <TableCell>{pack.cardsCount}</TableCell>
                                        <TableCell>{convertDate(pack.updated)}</TableCell>
                                        <TableCell>{pack.user_name}</TableCell>
                                        <TableCell>
                                            {myId === pack.user_id ?
                                                <div>
                                                    <IconButton>
                                                        <SchoolIcon/>
                                                    </IconButton>
                                                    <IconButton onClick={() => deletePackHandler(pack._id)}>
                                                        <DeleteForeverIcon/>
                                                    </IconButton>
                                                    <IconButton>
                                                        <EditIcon onClick={() => updatePackNameHandler(pack._id)}/>
                                                    </IconButton>
                                                </div>
                                                :
                                                <div>
                                                    <IconButton>
                                                        <SchoolIcon/>
                                                    </IconButton>
                                                </div>
                                            }
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                <PacksPaginationContainer/>
            </div>
            : <h3 style={{fontSize: '50px', color: 'white', textAlign: 'center'}}>Возможно паки ещё не загрузились,
                ожидайте...</h3>}

        </div>
    );
};
export default PackList;
