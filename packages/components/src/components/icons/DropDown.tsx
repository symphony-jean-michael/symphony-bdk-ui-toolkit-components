import * as React from 'react';
import { SVGProps } from 'react';
const SvgDropDown = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" {...props}>
    <path d="M5 6a1 1 0 0 0-.707 1.707l3 3a1 1 0 0 0 1.414 0l3-3A1 1 0 0 0 11 6H5Z" />
  </svg>
);
export default SvgDropDown;
