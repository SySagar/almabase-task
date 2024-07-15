export type typeBlock = {
    content: string;
    type: string;
    x: number;
    y: number;
};

export type mappedTypeBlock = {
    block: typeBlock;
    idx: number;
}