import { ReactElement, useState } from 'react';
import './App.scss';
import Box from './components/Box';

enum MaskType {
  LINEAR = 0,
  RADIAL = 1,
  LINEAR_DOUBLE = 2,
}

type Mask = {
  type: MaskType,
  percentage: number,
  secondPercentage?: number,
  firstPart: string,
  secondPart: string,
  degree?: number,
}

export default function App(): ReactElement {
  const defaultMask: Mask = {
    type: MaskType.LINEAR,
    percentage: 100,
    secondPercentage: 100,
    firstPart: 'rgba(0, 0, 0, 1)',
    secondPart: 'transparent',
    degree: 180,
  }

  const [mask, setMask] = useState<Mask>(defaultMask);
  const [currentCssMask, setCurrentCssMask] = useState<string>(`linear-gradient(${ mask.degree }deg, ${ mask.firstPart }, ${ mask.secondPart } ${ mask.percentage }%)`);

  return (
    <main>
      <section>
        <Box maskCss={ currentCssMask } />
        <textarea
          value={'mask-image: ' + currentCssMask}
          disabled
        />
        <button onClick={() => navigator.clipboard.writeText('mask-image: ' + currentCssMask)}>Copiar</button>
      </section>

      <section>
        <div className="buttons">
          <button onClick={() => {
            setMask({ ...mask, type: MaskType.LINEAR })
            setCurrentCssMask(`linear-gradient(${ mask.degree }deg, ${ mask.firstPart }, ${ mask.secondPart } ${ mask.percentage }%)`)}}>
            Linear
          </button>
          <button onClick={() => {
            setMask({ ...mask, type: MaskType.RADIAL })
            setCurrentCssMask(`radial-gradient(${mask.firstPart} ${ mask.percentage }%, ${ mask.secondPart } ${ mask.secondPercentage }%)`)}}>
            Radial
          </button>
          <button onClick={() => {
            setMask({ ...mask, type: MaskType.LINEAR_DOUBLE, secondPercentage: 100 })
            setCurrentCssMask(`linear-gradient(${ mask.degree }deg, ${ mask.secondPart } 5%, ${ mask.firstPart } ${ mask.percentage }%, ${ mask.firstPart } ${ mask.secondPercentage }%, ${ mask.secondPart } 95%)`)}}>
            Linear both sides
          </button>
        </div>

        {
          mask.type !== MaskType.RADIAL && 
          <>
            <label htmlFor="degree">Degree: { mask.degree }</label>
            <input 
              name="degree" 
              step={1} 
              max={270} 
              type="range" 
              value={ mask.degree }
              onChange={e => {
                setMask({ ...mask, degree: +e.target.value });

                if (mask.type === MaskType.LINEAR)
                  setCurrentCssMask(`linear-gradient(${ +e.target.value }deg, ${ mask.firstPart }, ${ mask.secondPart } ${ mask.percentage }%)`)
                else
                  setCurrentCssMask(`linear-gradient(${ +e.target.value }deg, ${ mask.secondPart } 5%, ${ mask.firstPart } ${ +mask.percentage }%, ${ mask.firstPart } ${ mask.secondPercentage }%, ${ mask.secondPart } 95%)`)
              }}
            />
            <button onClick={()=> {
              setMask({ ...mask, degree: 180 });

              if (mask.type === MaskType.LINEAR)
                setCurrentCssMask(`linear-gradient(${ 180 }deg, ${ mask.firstPart }, ${ mask.secondPart } ${ mask.percentage }%)`)
              else
                setCurrentCssMask(`linear-gradient(${ 180 }deg, ${ mask.secondPart } 5%, ${ mask.firstPart } ${ mask.percentage }%, ${ mask.firstPart } ${ mask.secondPercentage }%, ${ mask.secondPart } 95%)`)
            }}>180º</button>
          </>
        }

        <label htmlFor="percentage">Percentage: { mask.percentage }</label>
        <input 
          name="percentage" 
          step={1} 
          max={100} 
          type="range" 
          value={ mask.percentage }
          onChange={e => {
            setMask({ ...mask, percentage: +e.target.value });

            if (mask.type === MaskType.LINEAR)
              setCurrentCssMask(`linear-gradient(${ mask.degree }deg, ${ mask.firstPart }, ${ mask.secondPart } ${ +e.target.value }%)`)
            else if (mask.type === MaskType.RADIAL)
              setCurrentCssMask(`radial-gradient(${mask.firstPart} ${ +e.target.value }%, ${ mask.secondPart } ${ mask.secondPercentage }%)`)
            else
              setCurrentCssMask(`linear-gradient(${ mask.degree }deg, ${ mask.secondPart } 5%, ${ mask.firstPart } ${ +e.target.value }%, ${ mask.firstPart } ${ mask.secondPercentage }%, ${ mask.secondPart } 95%)`)
          }}
        />

        { 
          mask.type !== MaskType.LINEAR &&
          <>
            <label htmlFor="second-percentage">Second percentage: { mask.secondPercentage }</label>
            <input 
              name="second-percentage" 
              step={1} 
              max={100} 
              type="range" 
              value={ mask.secondPercentage }
              onChange={e => {
                if (+e.target.value < mask.percentage && mask.type === MaskType.RADIAL)
                  return;

                setMask({ ...mask, secondPercentage: +e.target.value });              
                if (mask.type === MaskType.RADIAL)
                  setCurrentCssMask(`radial-gradient(${mask.firstPart} ${ mask.percentage }%, ${ mask.secondPart } ${ +e.target.value }%)`)
                else
                  setCurrentCssMask(`linear-gradient(${ mask.degree }deg,${ mask.secondPart } 5%, ${ mask.firstPart } ${ mask.percentage }%, ${ mask.firstPart } ${ +e.target.value }%, ${ mask.secondPart } 95%)`) 
              }}
            />
          </>
        }
      </section>
    </main>
  );
}
