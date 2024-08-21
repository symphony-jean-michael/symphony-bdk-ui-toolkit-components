import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { clsx } from 'clsx';
import { EventListener, Keys } from '../common/eventUtils';
import { SvgIcon } from '../icon';
import { Icons } from '..';

interface ModalProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size'> {
  size: 'small' | 'medium' | 'large' | 'full-width';
  className?: string;
  children?: React.ReactNode;
  closeButton?: boolean;
  focusTrapEnabled?: boolean;
  parentNode?: Element;
  show?: boolean;
  onClose?: () => void;
}

type ModalContentProps = {
  className?: string;
  children?: React.ReactNode;
};

const prefix = 'tk-dialog';
const buildClass = (classStr: string) => `${prefix}__${classStr}`;

export const ModalTitle: React.FC<ModalContentProps> = ({
  className,
  children,
  ...rest
}: ModalContentProps) => <div className={clsx(buildClass('title'), className)} {...rest}>{children}</div>;

export const ModalHeader: React.FC<ModalContentProps> = ({
  className,
  children,
  ...rest
}: ModalContentProps) => <div className={clsx(buildClass('header'), className)} {...rest}>{children}</div >;

export const ModalBody: React.FC<ModalContentProps> = ({
  className,
  children,
  ...rest
}: ModalContentProps) => <div className={clsx(buildClass('body'), 'styled-scrollbars', className)} {...rest}>{children}</div>;

export const ModalFooter: React.FC<ModalContentProps> = ({
  className,
  children,
  ...rest
}: ModalContentProps) => <div className={clsx(buildClass('footer'), className)} {...rest}>{children}</div >;

const FOCUSABLE_ELEMENTS = 'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';

// Utility function to get focusable elements
const getFocusableElements = (container: HTMLElement) => {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS));
};

// Utility function to sort elements by tabIndex such that:
// - Elements with positive tabIndex are ordered first by tabIndex value.
// - Elements with tabIndex 0 are ordered last.
const sortByTabIndex = (elements: HTMLElement[]): HTMLElement[] => {
  return elements.sort((a, b) => {
    const tabIndexA = a.tabIndex || 0;
    const tabIndexB = b.tabIndex || 0;

    // Elements with a positive tabIndex come first, ordered by the tabIndex value
    if (tabIndexA > 0 && tabIndexB > 0) {
      return tabIndexA - tabIndexB;
    }

    // If one element has a positive tabIndex and the other is 0, prioritize the positive tabIndex
    if (tabIndexA > 0 && tabIndexB === 0) {
      return -1; // a comes before b
    }
    if (tabIndexB > 0 && tabIndexA === 0) {
      return 1; // b comes before a
    }

    // If both elements have tabIndex 0, maintain their relative order
    if (tabIndexA === 0 && tabIndexB === 0) {
      return 0;
    }

    return 0; // Maintain the order for any other cases
  });
}


// Focus trap handler
const handleTabKey = (event: KeyboardEvent, focusableElements: HTMLElement[]) => {
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const activeElement = document.activeElement as HTMLElement;
  const currentIndex = focusableElements.indexOf(activeElement);

  if (event.key === Keys.TAB) {
    let nextElement = null;
    if (event.shiftKey){
      if (document.activeElement === firstElement) {
        nextElement = lastElement;
      } else if (currentIndex >= 0){
        nextElement = focusableElements[currentIndex - 1];
      }
    } else {
      if(document.activeElement === lastElement) {
        nextElement = firstElement;
      } else if (currentIndex >= 0){
        nextElement = focusableElements[currentIndex + 1];
      }
    }
    nextElement?.focus();
    event.preventDefault();
  }
};

const Modal: React.FC<ModalProps> = ({
  size,
  className,
  children,
  closeButton,
  onClose,
  focusTrapEnabled,
  parentNode,
  show,
  ...rest
}: ModalProps) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const containerClasses = clsx(className, `${prefix}-backdrop`);
  const sizeClasses = clsx(prefix, { [`${prefix}--${size}`]: size });
  const handleContentClick = (event: React.MouseEvent<HTMLElement>) => event.stopPropagation();
  const onMouseDown = (event: React.MouseEvent) => event.stopPropagation();
  const handleKeyUp = (event: React.KeyboardEvent<HTMLElement>) => {
    if (onClose && event.key === Keys.ESC) {
      event.stopPropagation();
      onClose();
    }
  };

  React.useEffect(() => {
    if (show && focusTrapEnabled) {
      
      const trapFocus = () => {
        if (modalRef.current) {
          const focusableElements = getFocusableElements(modalRef.current);
          const sortedFocusableElements = sortByTabIndex(focusableElements);
          
          // Focus the first element if available
          sortedFocusableElements[0]?.focus();

          // Add event listener for Tab key
          const onKeyDown = (e: KeyboardEvent) => handleTabKey(e, sortedFocusableElements);
          document.addEventListener(EventListener.keydown, onKeyDown);

          // Cleanup event listener
          return () => document.removeEventListener(EventListener.keydown, onKeyDown);
        }
      };

      const cleanup = trapFocus();
      return cleanup;
    }
  }, [show, focusTrapEnabled]);

  const domResult = (
    <div
      onMouseDown={onMouseDown}
      {...rest}
      className={containerClasses}
      onClick={onClose}
      onKeyUp={handleKeyUp}
      tabIndex={-1}
    >
      <div ref={modalRef} role="dialog" className={sizeClasses} onClick={handleContentClick}>
        {closeButton && (
          <button
            aria-label="close"
            className={clsx(buildClass('close'), className)}
            onClick={onClose}
            type="button"
          >
            <SvgIcon icon={Icons.Cross} />
          </button>
        )}
        {children}
      </div>
    </div>
  );

  return show
    ? parentNode
      ? ReactDOM.createPortal(domResult, parentNode)
      : domResult
    : null;
};

export default Modal;
