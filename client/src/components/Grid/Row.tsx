import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Cell, MenuIcon } from '../Grid/Shared';
import Promotion from '../../models/Promotion';
import GridColumnConfig from '../../models/GridColumnConfig';
import RowMenu from './RowMenu';
import { useOutsideClickHandler } from '../../hooks/CustomHooks';

export type RowProps = {
    columns: Array<GridColumnConfig>;
    row: Promotion;
    style: any;
};

const Row = (props: RowProps) => {
    const menuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { columns, row, style } = props;

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useOutsideClickHandler(menuRef, closeMenu);

    return (
        <RowElement style={style}>
            <SelectionCell relativeWidth={0.5} minWidth={'30px'}>
                <input type='checkbox' />
            </SelectionCell>
            {Object.keys(row).map((cell: string, index: number) => {
                const column = columns.find((column) => column.name === cell);
                return (
                    <Cell
                        key={index}
                        relativeWidth={column?.relativeWidth}
                        minWidth={column?.minWidth}
                    >
                        {(row as any)[cell]}
                    </Cell>
                );
            })}
            <ActionsCell
                onClick={toggleMenu}
                relativeWidth={1}
                minWidth={'50px'}
            >
                <MenuIcon className='material-icons'>menu</MenuIcon>
            </ActionsCell>
            {isMenuOpen && (
                <span ref={menuRef}>
                    <RowMenu />
                </span>
            )}
        </RowElement>
    );
};

const SelectionCell = styled(Cell)`
    flex: 0.5;
    text-align: center;
    text-indent: 0;

    @media screen and (max-width: 768px) {
        flex: 0.5;
        font-size: 7px;
        min-width: 30px;
    }
`;

const ActionsCell = styled(Cell)`
    text-align: center;
    text-indent: 0;

    @media screen and (max-width: 768px) {
        font-size: 7px;
        min-width: 30px;
    }
`;

const RowElement = styled.div`
    display: flex;
    border-bottom: 1px solid lightgray;

    &:last-of-type {
        border-bottom: none;
    }
`;

export default Row;
