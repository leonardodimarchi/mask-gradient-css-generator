import { MaskTypeEnum } from "../enums/mask-type.enum";
import { Mask } from "./mask.interface";

export interface MaskRadial extends Mask {
    type: MaskTypeEnum.RADIAL;
    secondPercentage: number;
}