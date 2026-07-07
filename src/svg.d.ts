declare module "*.svg?react" {
  import type { SVGProps } from "react";

  const ReactComponent: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  export default ReactComponent;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
