import * as React from 'react';
import { HasTooltipProps } from '../tooltip/interfaces';
import { HasValidationProps } from '../validation/interfaces';
import { MenuPortalProps } from '../dropdown/interfaces';
import { Time } from './utils';

export type TimePickerValue = string;

interface DisabledExactTime {
  time: string;
}

interface DisabledTimeRange {
  from: string;
  to: string;
}

export interface TimePickerOption {
  label: string;
  value: string;
  data: {
    index: number;
    time: Time;
  };
}

export type DisabledTime = DisabledExactTime | DisabledTimeRange;

export type TimePickerProps = {
  id?: string;
  disabled?: boolean;
  /** Time or Range Time to disable. */
  disabledTimes?: DisabledTime | Array<DisabledTime>;
  /** Format of the time to write on the input field and to display the time in the Dropdown. Doesn’t affect value and disabled-time props format. */
  format?: string;
  /** Label that will be displayed on top of the Element. */
  label?: string;
  /** The earliest acceptable time with ISO_8601 format (HH:mm:ss). */
  min?: string;
  /** The latest acceptable time with ISO_8601 format (HH:mm:ss). */
  max?: string;
  /** Identifies the time picker. */
  name?: string;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  /** If null, then it will use the time format. */
  placeholder?: string;
  /** The step interval in seconds to be used to define the suggested times (min: 600, max: 43200, default: 900).*/
  step?: number;
  /** Enforce that the user cannot select a time that is not in the proposed list.*/
  strict?: boolean;
  /** Date with ISO_8601 format (HH:mm:ss). */
  value?: string;
  showRequired?: boolean;
} & MenuPortalProps &
  HasValidationProps<TimePickerValue> &
  HasTooltipProps;
