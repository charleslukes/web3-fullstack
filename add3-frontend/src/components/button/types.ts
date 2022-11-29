import { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type Props = {
    btnText: string;
    handleBtnClick: () => void
  } & ButtonProps
