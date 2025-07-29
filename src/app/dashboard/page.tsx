"use client";
import React from "react";
import { useStore } from "@/app/stores";
import Header from "@/app/header/page";

function Page() {
  const { count, setUser } = useStore((state) => state);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setUser({ name: "Alice" })}>Login as Alice</button>
      <hr />
      <Header />
    </div>
  );
}

export default Page;
