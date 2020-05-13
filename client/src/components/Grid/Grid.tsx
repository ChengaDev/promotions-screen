import React from 'react';
import styled from 'styled-components';
import Promotion from '../../models/Promotion';
import GridColumnConfig from '../../models/GridColumnConfig';
import { FadeInAnimation } from '../../animations/Animations';
import { Cell, CellProps } from '../Grid/Shared';
import Row from '../Grid/Row';
import { List, AutoSizer } from 'react-virtualized';

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
    const { columns, rows, totalRowText } = props;

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
                <Header minWidth={'50px'} relativeWidth={0.5}></Header>
                {columns.map((column: GridColumnConfig, index: number) => (
                    <Header
                        key={index}
                        minWidth={columns[index].minWidth}
                        relativeWidth={columns[index].relativeWidth}
                    >
                        {columns[index].displayName}
                    </Header>
                ))}
                <Header minWidth={'100px'} relativeWidth={1}>
                    Actions
                </Header>
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
            <Summary>
                <TotalRow>
                    {rows.length} {totalRowText}
                </TotalRow>
            </Summary>
        </Table>
    );
};

const TotalRow = styled.div`
    position: absolute;
    font-size: 13px;
    right: 0;
    margin-right: 20px;
    font-weight: 700;
`;

const Summary = styled.div`
    background-color: #e4f0e5;
    position: relative;
    height: 40px;
    line-height: 40px;
    border-radius: 0 0 5px 5px;
    border-top: 2px solid lightgray;
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    border-left: 1px solid lightgray;
`;

const Body = styled.div`
    height: 450px;
    background-color: white;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
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
    animation: ${FadeInAnimation} 0.8s;
    padding-right: 30px;
    padding-left: 30px;
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 40px;
`;

export default Grid;
