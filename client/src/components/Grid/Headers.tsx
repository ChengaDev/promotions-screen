import React from 'react';
import styled from 'styled-components';
import GridColumnConfig from '../../models/GridColumnConfig';
import { Cell, CellProps } from './Shared';

type HeadersProps = {
    columns: Array<GridColumnConfig>;
};

function Headers(props: HeadersProps) {
    let { columns } = props;
    const deafultMinWidth = '30px';
    return (
        <Container>
            <SelectionColumnHeader
                minWidth={deafultMinWidth}
                relativeWidth={0.5}
            />
            {columns.map((column: GridColumnConfig, index: number) => (
                <Header
                    key={index}
                    minWidth={columns[index].minWidth}
                    relativeWidth={columns[index].relativeWidth}
                >
                    {columns[index].displayName}
                </Header>
            ))}
            <ActionsColumnHeader minWidth={deafultMinWidth} relativeWidth={1}>
                Actions
            </ActionsColumnHeader>
        </Container>
    );
}

const Header = styled(Cell)`
    height: 30px;
    line-height: 30px;
    flex: ${(props: CellProps) => props.relativeWidth};
    font-weight: 900;
    border-left: 1px solid lightgray;
    margin-top: 5px;
    margin-bottom: 5px;

    &:first-of-type {
        border-left: none;
    }
`;

const SelectionColumnHeader = styled(Header)`
    flex: ${(props: CellProps) => props.relativeWidth};

    @media screen and (max-width: 768px) {
        flex: 0.5;
    }
`;

const ActionsColumnHeader = styled(Header)`
    text-indent: 0;
    text-align: center;
`;

const Container = styled.div`
    background-color: #e4f0e5;
    height: 40px;
    display: flex;
    border: 1px solid lightgray;
    border-bottom: 2px solid lightgray;
    border-radius: 5px 5px 0 0;
`;

export default Headers;
