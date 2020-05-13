import styled from 'styled-components';

export interface CellProps {
    readonly minWidth: string | undefined;
    readonly relativeWidth: number | undefined;
}

export const Cell = styled.div<CellProps>`
    color: black;
    text-indent: 15px;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 50px;
    font-weight: 700;
    flex: ${(props: CellProps) => props.relativeWidth};
    min-width: ${(props: CellProps) => props.minWidth};
`;

export const MenuIcon = styled.span`
    cursor: pointer;
    line-height: 40px;
    font-size: 30px;
    &:hover {
        color: red;
        font-weight: bold;
    }
`;
