import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';

type ModalProps = {
  size: 'small' | 'medium' | 'large' | 'full-width';
  className?: string;
  children?: React.ReactNode;
  closeButton?: boolean;
  parentNode?: Element;
  show?: boolean;
  onClose?: () => void;
};

type ModalContentProps = {
  children?: React.ReactNode;
};

const prefix = 'tk-dialog';
const buildClass = (classStr: string) => `${prefix}__${classStr}`;

export const ModalTitle: React.FC<ModalContentProps> = ({
  children,
}: ModalContentProps) => <div className={buildClass('title')}>{children}</div>;

export const ModalHeader: React.FC<ModalContentProps> = ({
  children,
}: ModalContentProps) => <div className={buildClass('header')}>{children}</div>;

export const ModalBody: React.FC<ModalContentProps> = ({
  children,
}: ModalContentProps) => <div className={buildClass('body')}>{children}</div>;

export const ModalFooter: React.FC<ModalContentProps> = ({
  children,
}: ModalContentProps) => <div className={buildClass('footer')}>{children}</div>;

const Modal: React.FC<ModalProps> = ({
  size,
  className,
  children,
  closeButton,
  onClose,
  parentNode,
  show,
  ...rest
}: ModalProps) => {
  const containerClasses = classNames(className, `${prefix}-backdrop`);
  const sizeClasses = classNames(prefix, `${prefix}--${size}`);
  // const handleContentClick = (ev: React.MouseEvent<HTMLElement>) => {
  //   ev.stopPropagation();
  //   if (onClose) {
  //     console.log('FIX!!! close', onClose);
  //     onClose();
  //   }
  // }

  const handleContentClick = React.useCallback(
    () => {
      (ev: React.MouseEvent<HTMLElement>) => {
        ev.stopPropagation();
        if (onClose) {
          console.log('FIX!!! close', onClose);
          onClose();
        }
      }
    },
    [onClose]
  );

  const domResult = (
    <div {...rest} className={classNames(containerClasses, { 'tk-d-none': !show })} onClick={onClose}>
      <div className={sizeClasses} onClick={handleContentClick}>
        {closeButton && (
          <button className={buildClass('close')} onClick={onClose} />
        )}
        {children}
      </div>
    </div>
  );

  return parentNode
    ? ReactDOM.createPortal(domResult, parentNode)
    : domResult;
};

export default Modal;
