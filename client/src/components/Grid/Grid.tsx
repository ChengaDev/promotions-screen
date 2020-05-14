import React from 'react';
import styled from 'styled-components';
import Promotion from '../../models/Promotion';
import GridColumnConfig from '../../models/GridColumnConfig';
import { FadeInAnimation } from '../../animations/Animations';
import { Cell, CellProps } from '../Grid/Shared';
import Row from '../Grid/Row';
import { List, AutoSizer } from 'react-virtualized';
import SummaryRow from './SummaryRow';

export type GridProps = {
    columns: Array<GridColumnConfig>;
    rows: Array<Promotion>;
    totalRowText: string;
};

type RenderRowProps = {
    style: any;
    index: number;
    key: number | string | undefined;
};

const Grid = (props: GridProps) => {
    const { columns, rows } = props;

    const renderRow = (props: RenderRowProps) => {
        return (
            <Row
                key={props.key}
                columns={columns}
                style={props.style}
                row={rows[props.index]}
            />
        );
    };

    return (
        <Table>
            <Headers>
                <SelectionColumnHeader minWidth={'30px'} relativeWidth={0.5} />
                {columns.map((column: GridColumnConfig, index: number) => (
                    <Header
                        key={index}
                        minWidth={columns[index].minWidth}
                        relativeWidth={columns[index].relativeWidth}
                    >
                        {columns[index].displayName}
                    </Header>
                ))}
                <ActionsColumnHeader minWidth={'30px'} relativeWidth={1}>
                    Actions
                </ActionsColumnHeader>
            </Headers>
            <Body>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            width={width}
                            height={450}
                            rowHeight={50}
                            rowRenderer={renderRow}
                            rowCount={rows.length}
                        />
                    )}
                </AutoSizer>
            </Body>
            <SummaryRow displayText={`${rows.length} rows`} />
        </Table>
    );
};

const Body = styled.div`
    height: 450px;
    background-color: white;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;

    &div.ReactVirtualized__Grid {
        overflow-y: overlay !important;
    }
`;

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

const Headers = styled.div`
    background-color: #e4f0e5;
    height: 40px;
    display: flex;
    border: 1px solid lightgray;
    border-bottom: 2px solid lightgray;
    border-radius: 5px 5px 0 0;
`;

const Table = styled.div`
    text-align: left;
    animation: ${FadeInAnimation} 1s;
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 40px;
`;

export default Grid;
