export type typeBlock = {
    id: number;
    content: string;
    type: string;
    x: number;
    y: number;
};

export type mappedTypeBlock = {
    block: typeBlock;
    idx: number;
}