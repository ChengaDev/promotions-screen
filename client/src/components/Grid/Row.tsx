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
            <Cell relativeWidth={0.5} minWidth={'50px'}>
                <input type='checkbox' />
            </Cell>
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

const ActionsCell = styled(Cell)`
    text-align: center;
    text-indent: 0;
`;

const RowElement = styled.div`
    display: flex;
    border-bottom: 1px solid lightgray;

    &:last-of-type {
        border-bottom: none;
    }
`;

export default Row;
