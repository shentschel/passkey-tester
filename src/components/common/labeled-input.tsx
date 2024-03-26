/** @format */

import { ReactNode } from 'react';
import * as React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { AsProp } from 'react-bootstrap/helpers';

type LabeledProps = {
  id: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'lg' | 'sm';
  disabled?: boolean;
  defaultValue?: string | number;
};

export type LabeledInputProps = AsProp &
  LabeledProps & {
    type?: string;
    value?: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    readonly?: boolean;
  };

export type LabeledSelectProps = LabeledProps & {
  value: string | number;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  children?: ReactNode | ReactNode[];
};

export const LabeledInput = (props: LabeledInputProps) => (
  <Form.Group controlId={props.id} className={props.className ?? 'mb-3'}>
    <Form.Label>{props.label}</Form.Label>

    <Form.Control
      type={props.type ?? 'text'}
      as={props.as ?? 'input'}
      value={props.value}
      onChange={props.onChange}
      style={props.style}
      size={props.size}
      disabled={props.disabled}
      readOnly={props.readonly}
      defaultValue={props.defaultValue}
    />
  </Form.Group>
);

export const FloatedLabelInput = (props: LabeledInputProps) => (
  <FloatingLabel label={props.label} controlId={props.id} className={props.className ?? 'mb-3'}>
    <Form.Control
      type={props.type ?? 'text'}
      as={props.as ?? 'input'}
      value={props.value}
      onChange={props.onChange}
      style={props.style}
      size={props.size}
      disabled={props.disabled}
      readOnly={props.readonly}
      defaultValue={props.defaultValue}
    />
  </FloatingLabel>
);

export const LabeledSelect = (props: LabeledSelectProps) => (
  <Form.Group controlId={props.id} className={props.className ?? 'mb-3'}>
    <Form.Label>{props.label}</Form.Label>

    <Form.Select
      size={props.size}
      value={props.value}
      onChange={props.onChange}
      style={props.style}
      disabled={props.disabled}
      defaultValue={props.defaultValue}>
      {props.children}
    </Form.Select>
  </Form.Group>
);

export const FloatedLabelSelect = (props: LabeledSelectProps) => (
  <FloatingLabel label={props.label} controlId={props.id} className={props.className ?? 'mb-3'}>
    <Form.Select
      size={props.size}
      value={props.value}
      onChange={props.onChange}
      style={props.style}
      disabled={props.disabled}
      defaultValue={props.defaultValue}>
      {props.children}
    </Form.Select>
  </FloatingLabel>
);
