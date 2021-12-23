import { ReactElement, useState } from 'react';
import { toast } from 'react-toastify';

import copyIcon from './../../assets/imgs/copy-outline.svg';
import { MaskTypeEnum } from '../../models/enums/mask-type.enum';
import { MaskLinearDouble } from '../../models/interfaces/mask-linear-double-interface';
import { MaskLinear } from '../../models/interfaces/mask-linear-interface';
import { MaskRadial } from '../../models/interfaces/mask-radial-interface';
import { Mask } from '../../models/interfaces/mask.interface';
import Box from '../Box';

import './styles.scss'

export function MainContainer(): ReactElement {
  const [maskLinear, setMaskLinear] = useState<MaskLinear>({
    type: MaskTypeEnum.LINEAR,
    degree: 180,
    percentage: 100,
    firstPart: 'rgba(0, 0, 0, 1)',
    secondPart: 'transparent',
  });

  const [maskRadial, setMaskRadial] = useState<MaskRadial>({
    type: MaskTypeEnum.RADIAL,
    percentage: 50,
    secondPercentage: 65,
    firstPart: 'rgba(0, 0, 0, 1)',
    secondPart: 'transparent',
  });

  const [maskLinearDouble, setMaskLinearDouble] = useState<MaskLinearDouble>({
    type: MaskTypeEnum.LINEAR_DOUBLE,
    degree: 180,
    percentage: 50,
    secondPercentage: 70,
    firstPart: 'rgba(0, 0, 0, 1)',
    secondPart: 'transparent',
  });

  const [selectedMask, setSelectedMask] = useState<MaskTypeEnum>(MaskTypeEnum.LINEAR);

  return (
    <div className="generator">
      <div className="generator--column">
        <Box maskCss={ returnCurrentCSSMask() }/>

        <div className="copy-area">
          <p>
            { 'mask-image: ' + returnCurrentCSSMask() + ';' }
          </p>

          <img src={ copyIcon } alt="Copy css mask code" onClick={ copyMaskToClipBoard }/>
        </div>
      </div>

      <div className="generator--column">
        <div className="buttons">
          <button
            className={ selectedMask === MaskTypeEnum.LINEAR ? 'selected-button' : '' }
            onClick={ () => {
              setSelectedMask(MaskTypeEnum.LINEAR);
            } }
          >
            Linear
          </button>

          <button
            className={ selectedMask === MaskTypeEnum.RADIAL ? 'selected-button' : '' }
            onClick={ () => {
              setSelectedMask(MaskTypeEnum.RADIAL);
            } }
          >
            Radial
          </button>

          <button
            className={ selectedMask === MaskTypeEnum.LINEAR_DOUBLE ? 'selected-button' : '' }
            onClick={ () => {
              setSelectedMask(MaskTypeEnum.LINEAR_DOUBLE);
            } }
          >
            Linear both sides
          </button>
        </div>

        {
          selectedMask !== MaskTypeEnum.RADIAL &&
          <div className="input">
              <label htmlFor="degree">
                  Degree: <b>{ selectedMask === MaskTypeEnum.LINEAR ? maskLinear.degree : maskLinearDouble.degree }º</b>
              </label>

              <input
                  name="degree"
                  step={ 1 }
                  max={ 270 }
                  type="range"
                  value={ selectedMask === MaskTypeEnum.LINEAR ? maskLinear.degree : maskLinearDouble.degree }
                  onChange={ e => {
                    if (selectedMask === MaskTypeEnum.LINEAR)
                      setMaskLinear({ ...maskLinear, degree: +e.target.value });
                    else
                      setMaskLinearDouble({ ...maskLinearDouble, degree: +e.target.value });
                  } }
              />

              <button onClick={ () => {
                if (selectedMask === MaskTypeEnum.LINEAR)
                  setMaskLinear({ ...maskLinear, degree: 180 });
                else
                  setMaskLinearDouble({ ...maskLinearDouble, degree: 180 });
              } }>
                  180º
              </button>
          </div>
        }

        <div className="input">
          <label htmlFor="percentage">
            Percentage: <b>{ getPropByMaskType('percentage') }%</b>
          </label>

          <input
            name="percentage"
            step={ 1 }
            max={ 100 }
            type="range"
            value={ getPropByMaskType('percentage') }
            onChange={ e => setPropByMaskType('percentage', +e.target.value) }
          />
        </div>

        {
          selectedMask !== MaskTypeEnum.LINEAR &&
          <div className="input">
              <label htmlFor="second-percentage">
                  Second
                  percentage: <b>{ selectedMask === MaskTypeEnum.RADIAL ? maskRadial.secondPercentage : maskLinearDouble.secondPercentage }%</b>
              </label>

              <input
                  name="second-percentage"
                  step={ 1 }
                  max={ 100 }
                  type="range"
                  value={ selectedMask === MaskTypeEnum.RADIAL ? maskRadial.secondPercentage : maskLinearDouble.secondPercentage }
                  onChange={ e => {
                    if (+e.target.value < maskRadial.percentage && selectedMask === MaskTypeEnum.RADIAL)
                      return;

                    if (selectedMask === MaskTypeEnum.RADIAL)
                      setMaskRadial({ ...maskRadial, secondPercentage: +e.target.value });
                    else
                      setMaskLinearDouble({ ...maskLinearDouble, secondPercentage: +e.target.value });
                  } }
              />
          </div>
        }
      </div>
    </div>
  );

  function getPropByMaskType(prop: keyof Mask): any {
    const propByMaskType: Record<MaskTypeEnum, any> = {
      [MaskTypeEnum.LINEAR]: maskLinear[prop],
      [MaskTypeEnum.RADIAL]: maskRadial[prop],
      [MaskTypeEnum.LINEAR_DOUBLE]: maskLinearDouble[prop],
    };

    return propByMaskType[selectedMask];
  }

  function setPropByMaskType(prop: keyof Mask, value: string | number): void {
    const setterByMaskType: Record<MaskTypeEnum, any> = {
      [MaskTypeEnum.LINEAR]: () => setMaskLinear({ ...maskLinear, [prop]: value }),
      [MaskTypeEnum.RADIAL]: () => setMaskRadial({ ...maskRadial, [prop]: value }),
      [MaskTypeEnum.LINEAR_DOUBLE]: () => setMaskLinearDouble({ ...maskLinearDouble, [prop]: value }),
    };

    setterByMaskType[selectedMask]();
  }

  function returnCurrentCSSMask(): string {
    const linearMaskProps = `${ maskLinear.degree }deg, ${ maskLinear.firstPart }, ${ maskLinear.secondPart } ${ maskLinear.percentage }%`;
    const radialMaskProps = `${ maskRadial.firstPart } ${ maskRadial.percentage }%, ${ maskRadial.secondPart } ${ maskRadial.secondPercentage }%`;
    const linearDoubleMaskProps = `${ maskLinearDouble.degree }deg, ${ maskLinearDouble.secondPart } 5%, ${ maskLinearDouble.firstPart } ${ maskLinearDouble.percentage }%, ${ maskLinearDouble.firstPart } ${ maskLinearDouble.secondPercentage }%, ${ maskLinearDouble.secondPart } 95%`;

    const maskCSSValues: Record<MaskTypeEnum, string> = {
      [MaskTypeEnum.LINEAR]: `linear-gradient(${ linearMaskProps })`,
      [MaskTypeEnum.RADIAL]: `radial-gradient(${ radialMaskProps })`,
      [MaskTypeEnum.LINEAR_DOUBLE]: `linear-gradient(${ linearDoubleMaskProps })`,
    };

    return maskCSSValues[selectedMask];
  }

  async function copyMaskToClipBoard(): Promise<void> {
    await navigator.clipboard.writeText('mask-image: ' + returnCurrentCSSMask());
    toast('CSS copied to clipboard');
  }
}
