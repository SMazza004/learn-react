import { FormControl, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import InputErrorMessage from "./error/InputErrorMessage";
import { ChangeEvent, JSX, useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";

import "../../assets/css/Input.css";

type InputProps = {
  type: string;
  label: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  className?: string;
};

type TextInputProps = {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  className?: string;
};

type NumberInputProps = {
  label: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  className?: string;
};

type DateInputProps = {
  label: string;
  value: Date;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  className?: string;
};

type SelectInputProps = {
  label: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  error: boolean;
  className?: string;
  children?: any[];
};

function generateRandomId(prefix: string): string {
  return prefix + Math.floor(Math.random() * 9999);
}

export default function Input({
  type,
  label,
  value,
  onChange,
  error,
  className,
}: InputProps) {
  const id = generateRandomId(`${type}Input`);

  return (
    <FormGroup className="mb-3">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormControl
        id={id}
        value={value}
        placeholder={label}
        type={type}
        onChange={onChange}
        className={className + (error ? " border-danger" : "")}
      />
      {error && <InputErrorMessage>{label} cannot be empty</InputErrorMessage>}
    </FormGroup>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  error,
  className,
}: TextInputProps) {
  return (
    <Input
      type="text"
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      className={className}
    />
  );
}

export function NumberInput({
  label,
  value,
  onChange,
  error,
  className,
}: NumberInputProps) {
  return (
    <Input
      type="number"
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      className={className}
    />
  );
}

export function EmailInput({
  label,
  value,
  onChange,
  error,
  className,
}: TextInputProps) {
  return (
    <Input
      type="email"
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      className={className}
    />
  );
}

export function PasswordInput({
  label,
  value,
  onChange,
  error,
  className,
}: TextInputProps) {
  const [show, setShow] = useState(false);

  const id = generateRandomId(`$passwordInput`);

  return (
    <FormGroup className="mb-3 w-100">
      <FormLabel className="w-100" htmlFor={id}>
        {label}
      </FormLabel>
      <div className="d-inline-block position-relative w-100">
        <FormControl
          id={id}
          value={value}
          placeholder={label}
          type={show ? "text" : "password"}
          onChange={onChange}
          className={className + " w-100 " + (error ? "border-danger" : "")}
        />
        <span onClick={() => setShow(!show)} className="password-shower">
          {show ? <EyeSlash /> : <Eye />}
        </span>
      </div>
      {error && <InputErrorMessage>{label} cannot be empty</InputErrorMessage>}
    </FormGroup>
  );
}

export function DateTimeInput({
  label,
  value,
  onChange,
  error,
  className,
}: DateInputProps) {
  return (
    <Input
      type="datetime-local"
      label={label}
      value={value ? value.toISOString().slice(0, 16) : ""}
      onChange={onChange}
      error={error}
      className={className}
    />
  );
}

export function SelectInput({
  label,
  value,
  onChange,
  error,
  className,
  children,
}: SelectInputProps) {
  const id = generateRandomId(`$selectInput`);

  return (
    <FormGroup className="mb-3">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormSelect
        id={id}
        value={value}
        onChange={onChange}
        className={className}
      >
        {children}
      </FormSelect>
      {error && <InputErrorMessage>{label} cannot be empty</InputErrorMessage>}
    </FormGroup>
  );
}
