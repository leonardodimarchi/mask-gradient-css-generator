import { MaskTypeEnum } from "../enums/mask-type.enum";
import { Mask } from "./mask.interface";

export interface MaskLinearDouble extends Mask {
    type: MaskTypeEnum.LINEAR_DOUBLE;
    degree: number;
    secondPercentage: number;
}