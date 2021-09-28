/* eslint-disable react/prop-types */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Keys } from '../common/keyUtils';

type ModalProps = {
  size: 'small' | 'medium' | 'large' | 'full-width';
  className?: string;
  children?: React.ReactNode;
  closeButton?: boolean;
  parentNode?: Element;
  show?: boolean;
  onClose?: () => void;
  id?: string,
};

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
}: ModalContentProps) => <div className={classNames(buildClass('title'), className)} {...rest}>{children}</div>;

export const ModalHeader: React.FC<ModalContentProps> = ({
  className,
  children,
  ...rest
}: ModalContentProps) => <div className={classNames(buildClass('header'), className)} {...rest}> {children}</div >;

export const ModalBody: React.FC<
  ModalContentProps &
  React.RefAttributes<HTMLDivElement>
> = React.forwardRef(
  (
    {
      className,
      children,
      ...rest
    }: ModalContentProps,
    ref?
  ) => (<div ref={ref} className={classNames(buildClass('body'), className)} {...rest}>{children}</div>));
ModalBody.displayName = 'ModalBody';

export const ModalFooter: React.FC<ModalContentProps> = ({
  className,
  children,
  ...rest
}: ModalContentProps) => <div className={classNames(buildClass('footer'), className)} {...rest}> {children}</div >;

const Modal: React.FC<
  ModalProps &
  React.RefAttributes<HTMLDivElement>
> = React.forwardRef(
  (
    {
      size,
      className,
      children,
      closeButton,
      onClose,
      parentNode,
      show,
      ...rest
    }: ModalProps,
    ref?
  ) => {
    const containerClasses = classNames(className, `${prefix}-backdrop`);
    const sizeClasses = classNames(prefix, { [`${prefix}--${size}`]: size });
    const handleContentClick = (event: React.MouseEvent<HTMLElement>) =>
      event.stopPropagation();
    const handleKeyUp = (event: React.KeyboardEvent<HTMLElement>) => {
      if (onClose && event.key === Keys.ESC) {
        event.stopPropagation();
        onClose();
      }
    };

    const domResult = (
      <div
        {...rest}
        className={containerClasses}
        onClick={onClose}
        onKeyUp={handleKeyUp}
        tabIndex={-1}
        ref={ref}
      >
        <div role="dialog" className={sizeClasses} onClick={handleContentClick} style={{ position: 'relative' }}>
          {closeButton && (
            <button
              type="button"
              aria-label="close"
              className={buildClass('close')}
              onClick={onClose}
            />
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
  });
export default Modal;