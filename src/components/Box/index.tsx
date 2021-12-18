import { ReactElement } from 'react';
import './styles.scss';

type BoxProps = {
  maskCss: string;
}

export default function Box({ maskCss }: BoxProps): ReactElement {
  return (
    <div className="box" style={{ maskImage: maskCss, WebkitMaskImage: maskCss }}>
      {
        [0, 1, 2, 3].map((_, index) => {
          return (
            <p key={index}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus enim turpis,
              nec ullamcorper massa porta vel. In ac porttitor tortor. Vivamus viverra eget tellus a volutpat.
              Praesent rutrum lorem et ante tempor, ut tempus enim tempor. Maecenas magna arcu, euismod at augue a,
              pretium dignissim risus. Duis sed porttitor tellus, in sodales elit. Donec ultrices viverra turpis id porta.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla tempor leo
              molestie tellus molestie, id euismod sapien consequat. Maecenas quis bibendum tellus. Aliquam molestie ligula eget tempor gravida.
              Etiam tincidunt, orci ut vestibulum elementum, diam erat semper eros, nec iaculis tellus urna a risus. Nulla facilisi.
              Maecenas posuere cursus mi ut pretium.
              Morbi et purus eu lacus tempus egestas quis et enim. Phasellus sem sem,
              pharetra vel lectus eleifend, tempor fermentum lacus. Sed ullamcorper
              nunc consequat urna sodales tristique. Sed laoreet, ligula sit amet viverra laoreet,
              lacus risus dapibus dolor, et ornare erat velit at tellus. Maecenas sagittis laoreet lectus eget bibendum.
              Phasellus facilisis est non aliquam suscipit. In hac habitasse platea dictumst. Etiam tristique semper ipsum,
              ut posuere enim imperdiet id. Duis a pulvinar nisl. Mauris et enim urna. In malesuada nulla mi, ut lacinia elit lacinia a.
              Aenean at eros eu nulla fringilla euismod.
            </p>
          )
        })
      }
    </div>
  )
}
