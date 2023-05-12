import React from "react";
import {
  // Link,
  Outlet,
} from "react-router-dom";
import Header from "../Header";
import Container from "../Container";

export default function Layout({ handleOpenLeftPanel }) {
  return (
    <>
      <Header handleOpenLeftPanel={handleOpenLeftPanel} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
