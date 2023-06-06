"use client";
import { Wysiwyg } from "@components/Wysiwyg/Wysiwyg.component";
import * as React from "react";

interface TestPageProps {}

export default function Test() {
  const [message, setMessage] = React.useState("");
  return (
    <div
      style={{
        backgroundColor: "gray",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <React.Suspense fallback={<div>Loading...</div>}>
        <Wysiwyg
          width={"70%"}
          value={message}
          setValue={setMessage}
          onSubmit={() => console.log("submit", message)}
        />
      </React.Suspense>
    </div>
  );
}
