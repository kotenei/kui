export interface PortalProps {
  container?: Element;
  timeout?: number;
  in?: boolean;
  appear?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onEntering?: (node: HTMLElement, isAppearing: boolean) => void;
  onEntered?: (node: HTMLElement, isAppearing: boolean) => void;
  onExit?: (node: HTMLElement) => void;
  onExiting?: (node: HTMLElement) => void;
  onExited?: (node: HTMLElement) => void;
  children?: React.ReactNode;
}
