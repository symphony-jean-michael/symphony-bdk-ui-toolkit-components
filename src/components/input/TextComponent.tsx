import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import shortid from 'shortid';

import { HasValidationProps } from '../validation/interfaces';
import { HasTooltipProps } from '../tooltip/interfaces';
import LabelTooltipDecorator from '../label-tooltip-decorator/LabelTooltipDecorator';

enum Types {
  TEXTAREA = 'TextArea',
  TEXTFIELD = 'TextField',
}

export type InputBaseProps = {
  onCopy?: (event) => any;
  onCut?: (event) => any;
  onDrag?: (event) => any;
};

type TextComponentProps = {
  /** React Element to display inside the Field, on the right side */
  rightDecorators?: JSX.Element | JSX.Element[];
  className?: string;
  disabled?: boolean;
  /** React Element to display inside the Field, on the left side */
  iconElement?: JSX.Element;
  id?: string;
  label?: string;
  /** Force the text to display masked "••••" */
  isMasked?: boolean;
  /** Deprecated, please use rightDecorators instead */
  masked?: boolean;
  placeholder?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  value?: string;
  showRequired?: boolean;
} & HasTooltipProps &
  HasValidationProps<string>;

type TextComponentPropsWithType = TextComponentProps &
  InputBaseProps & {
    type: Types;
  };

export const InputBasePropTypes = {
  onCopy: PropTypes.func,
  onCut: PropTypes.func,
  onDrag: PropTypes.func,
};

const TextComponentPropTypes = {
  rightDecorators: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  iconElement: PropTypes.element,
  isMasked: PropTypes.bool,
  label: PropTypes.string,
  masked: PropTypes.bool,
  placeholder: PropTypes.string,
  onInit: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  tooltipCloseLabel: PropTypes.string,
  value: PropTypes.string,
  showRequired: PropTypes.bool,
};

const TextComponent: React.FC<
  TextComponentPropsWithType &
  React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>
> = React.forwardRef(
  (
    {
      rightDecorators,
      className,
      id,
      iconElement,
      isMasked,
      type,
      disabled,
      label,
      placeholder,
      masked,
      tooltip,
      tooltipCloseLabel,
      value,
      showRequired,
      onInit,
      onChange,
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onValidationChanged,
      ...rest
    },
    ref
  ) => {
    const [hideText, setHideText] = useState(masked || false);

    useEffect(() => {
      if (onInit && value) {
        onInit(value);
      }
    }, []);

    // Generate unique ID if not provided
    const inputId = useMemo(() => {
      return id || `tk-input-${shortid.generate()}`;
    }, [id]);

    const tooltipId = useMemo(() => `tk-hint-${shortid.generate()}`, []);

    const handleViewText = (event) => {
      if (disabled) return;

      event.preventDefault();
      setHideText(!hideText);
    };

    let TagName;
    if (type == Types.TEXTAREA) {
      TagName = 'textarea';
    } else {
      TagName = 'input';
    }

    return (
      <div
        className={classNames('tk-input-group', {
          'tk-input-group--disabled': disabled,
        })}
      >
        <LabelTooltipDecorator
          id={tooltipId}
          htmlFor={inputId}
          label={label}
          placement={'top'}
          tooltip={tooltip}
          tooltipCloseLabel={tooltipCloseLabel}
          showRequired={showRequired}
        />
        <div
          className={classNames(className, 'tk-input__container', {
            'tk-input__container--disabled': disabled,
          })}
        >
          <TagName
            id={inputId}
            ref={ref}
            aria-autocomplete="none"
            aria-describedby={tooltip && tooltipId}
            aria-label={label}
            aria-placeholder={placeholder}
            aria-readonly={disabled}
            aria-multiline={type === Types.TEXTAREA}
            className={classNames('tk-input')}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onClick={onClick}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onChange={onChange}
            type={type === Types.TEXTFIELD ? 'text' : null}
            style={
              {
                WebkitTextSecurity:
                  type == Types.TEXTFIELD &&
                  (isMasked || (masked && hideText)) &&
                  'disc',
              } as React.CSSProperties
            }
            disabled={disabled}
            {...rest}
          />

          {rightDecorators && type == Types.TEXTFIELD
            ? Array.isArray(rightDecorators)
              ? rightDecorators.map((decorator) => decorator)
              : rightDecorators
            : null}
          {type == Types.TEXTFIELD && masked && value?.length ? (
            <button
              className="tk-input__hide"
              tabIndex={value && value.length === 0 ? -1 : 0}
              onClick={handleViewText}
            >
              {hideText ? 'show' : 'hide'}
            </button>
          ) : null}
          {iconElement && type == Types.TEXTFIELD
            ? // Clone the iconElement in order to attach className 'tk-input__icon'
            React.cloneElement(iconElement, {
              className: classNames(
                'tk-input__icon',
                iconElement.props.className
              ),
            })
            : null}
        </div>
      </div>
    );
  }
);

TextComponent.propTypes = {
  ...TextComponentPropTypes,
  ...InputBasePropTypes,
  type: PropTypes.oneOf(Object.values(Types)).isRequired,
};
TextComponent.displayName = 'TextComponent';

export { TextComponentPropTypes, TextComponentProps, TextComponent, Types };
