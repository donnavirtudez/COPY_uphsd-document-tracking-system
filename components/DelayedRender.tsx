"use client";

import { useEffect, useState } from "react";

export default function DelayedRender({
  children,
  delay = 2000,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return show ? <>{children}</> : null;
}
