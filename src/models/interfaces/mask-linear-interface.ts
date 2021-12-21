import { MaskTypeEnum } from "../enums/mask-type.enum";
import { Mask } from "./mask.interface";

export interface MaskLinear extends Mask {
    type: MaskTypeEnum.LINEAR;
    degree: number;
}