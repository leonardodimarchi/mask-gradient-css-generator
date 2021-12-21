import { MaskTypeEnum } from "../enums/mask-type.enum";

export interface Mask {
    type: MaskTypeEnum;
    percentage: number;
    firstPart: string;
    secondPart: string;
}