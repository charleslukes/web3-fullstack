import React, { InputHTMLAttributes } from "react";

export type ButtonProps = InputHTMLAttributes<HTMLInputElement>;

export type Props = {
   placeholder: string;
   handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  } & ButtonProps
