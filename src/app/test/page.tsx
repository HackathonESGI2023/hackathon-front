import { Wysiwyg } from "@components/Wysiwyg/Wysiwyg.component";
import * as React from "react";

interface TestPageProps {}

export default function Test() {
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
      <Wysiwyg width={"70%"} />
    </div>
  );
}
