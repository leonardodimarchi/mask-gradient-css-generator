import { ReactElement } from 'react';

import './App.scss';
import useCaseScroll from './assets/gifs/use-case-scroll.gif';

import useCase01 from './assets/imgs/use-case-01.jpg';
import useCase02 from './assets/imgs/use-case-02.jpg';
import useCase03 from './assets/imgs/use-case-03.jpg';
import useCase04 from './assets/imgs/use-case-04.jpg';
import { MainContainer } from './components/MainContainer';

export default function App(): ReactElement {
  return (
    <main>
      <section>
        <h1>CSS Mask Generator</h1>
        <MainContainer/>
      </section>

      <section>
        <h2>The fade effect from Mask property</h2>
        <article>
          <p>
            A Fade effect in css can be achieved from a div layer above the container, by playing with a the opacity of
            gradient from a solid color. However, using a css mask, it is possible to achieve the same result without
            relying on a solid color or extra work in the HTML of the page, leaving this responsibility to the mask.

            <ul>
              <li>
                You may also need to set the same property with webkit as well.
                eg: <strong>-webkit-mask-image: { '<value>' }</strong>;
              </li>
              <li>
                To check browser compatibility, check it out at the caniuse website:
                <a href="https://caniuse.com/?search=mask-image"> https://caniuse.com/?search=mask-image</a>.
              </li>
            </ul>
          </p>

          <img loading="lazy" src={ useCase01 } alt="First CSS mask fade use case: Fading a overflowed text"/>
        </article>

        <article>
          <p>
            The mask-image property can also be used with either a linear gradient or a radial gradient, in
            both cases, it can be assembled from a mix of gradients (which is the case of 'Linear both sides' in the
            generator).
          </p>

          <div className="image-pair">
            <img loading="lazy" src={ useCase02 } alt="Second CSS mask fade use case: Radial gradient to focus attention"/>
            <img loading="lazy" src={ useCase03 } alt="Third CSS mask fade use case: Linear gradient at the top and bottom to fade text"/>
          </div>

          <p>
            See some use cases of the fade effect:
          </p>

          <ul>
            <li>
              <p>
                Fading a time/date select roulette input
              </p>
              <img loading="lazy" src={ useCase04 } alt="CSS Mask Fade use case: Fading a time-select roulette"/>
            </li>
            <li>
              <p>
                Smooth scroll effect
              </p>
              <img loading="lazy" src={ useCaseScroll } alt="CSS Mask Fade use case: Smooth scroll"/>
            </li>
          </ul>
        </article>

        <article>
          <p>
            This is only one use case of the css mask, it can also be used with images and SVG's
            to create many different types of custom shapes.
          </p>

          <svg viewBox="0 0 400 300">
            <defs>
              <mask id="mask">
                <rect fill="#000000" x="0" y="0" width="400" height="300"/>
                <circle fill="#FFFFFF" cx="150" cy="150" r="80"/>
                <circle fill="#FFFFFF" cx="50" cy="80" r="30"/>
              </mask>
            </defs>
            <image mask="url(#mask)" xmlnsXlink="https://www.w3.org/1999/xlink" xlinkHref="https://placekitten.com/1000/500" width="400" height="300"/>
          </svg>

          <p>
            Some CSS mask properties related docs:
          </p>

          <ul>
            <li>
              <a target="_blank" rel="dofollow noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image">
                https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image
              </a>
            </li>
            <li>
              <a target="_blank" rel="dofollow noreferrer" href="https://developer.mozilla.org/pt-BR/docs/Web/CSS/mask">
                https://developer.mozilla.org/pt-BR/docs/Web/CSS/mask
              </a>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}
