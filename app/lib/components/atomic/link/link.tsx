import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function Link({ children, href, className = "" }) {
  const { route } = useRouter();

  return (
    <NextLink href={href}>
      <a className={`${className}${route === href ? "--active" : ""}`}>
        {children}
      </a>
    </NextLink>
  );
}
