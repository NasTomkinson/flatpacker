"use client";

import type { IconifyIconProps } from "@iconify-icon/react";
import { Icon as IconifyIcon } from "@iconify-icon/react";
import type { ComponentPropsWithoutRef } from "react";

type IconifyProps = ComponentPropsWithoutRef<typeof IconifyIcon>;
type IconSize = 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48;

type IconProps = Omit<
  IconifyProps,
  "aria-hidden" | "aria-label" | "icon" | "name" | "size"
> & {
  icon?: IconifyIconProps["icon"];
  label?: string;
  name?: IconifyIconProps["icon"];
  size?: IconSize;
};

export const Icon = ({
  className,
  height,
  icon,
  label,
  name,
  size,
  width,
  ...props
}: IconProps) => {
  const iconSize = size ? `${size / 4}rem` : undefined;

  return (
    <IconifyIcon
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={className}
      height={iconSize ?? height}
      icon={icon ?? name ?? ""}
      width={iconSize ?? width}
      {...props}
    />
  );
};
