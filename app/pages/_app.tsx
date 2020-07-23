import React from "react";
import App, { Container } from "next/app";
import { StoreProvider } from "../stores/stores";

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StoreProvider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </StoreProvider>
    );
  }
}

export default CustomApp;
