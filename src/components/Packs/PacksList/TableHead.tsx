import React, {useState} from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from '@mui/material/TableHead';
import {TableSortLabel} from "@mui/material";
import s from "./PackList.module.css";

export type sortModeType = { sortBy: string, direction: 'asc' | 'desc' }
export type headCellsType = {
    id: string
    label: string,
    align?: "left" | "center" | "right" | "justify" | "inherit" | undefined
    padding?: "checkbox" | "none" | "normal" | undefined
    width?: string
}
type PropsType = {
    headCells: headCellsType[]
    sortCallBack: (mode:sortModeType) => void
}


const CommonTableHead: React.FC<PropsType> = ({headCells, sortCallBack}) => {
    const [sortMode, setSortMode] = useState<sortModeType>({sortBy: 'updated', direction: 'desc'})

    const onSortModeChangeHandler = (id: string) => () => {
        const isAsc = id === sortMode.sortBy && sortMode.direction === 'asc'
        const mode: sortModeType = {
            sortBy: id,
            direction: isAsc ? 'desc' : 'asc'
        }
        setSortMode(mode)
        sortCallBack(mode)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map(cell =>
                    <TableCell
                        key={`TableCell${cell.id}`}
                        align={cell.align}
                        padding={cell.padding}
                        width={cell.width}
                    >
                        <TableSortLabel
                            disabled={cell.id === 'actions'}
                            active={cell.id === sortMode.sortBy}
                            direction={cell.id === sortMode.sortBy ? sortMode.direction : 'asc'}
                            onClick={onSortModeChangeHandler(cell.id)}
                            className={s.sortArrow}
                        >
                            {cell.label}
                        </TableSortLabel>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

export default CommonTableHead;