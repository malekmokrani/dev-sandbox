import React from "react";
import { css } from "styled-components";

export const stylish = {
  inputWrapper: {
    base: css`
      border-radius: 0.5rem;
    `
  },
  fieldWrapper: {
    base: css`
      margin-bottom: 1rem;
      /* border: 2px solid green; */
      border-radius: 1rem;
      
      width: 90%;
    `,
    inputWrapper: {
      base: css`
        /* border-color: green; */
        border-radius: 1rem;
      `
    },
    errored: css`
      /* border-color: green; */
    `,
    focused: css`
      border-color: unset;
      box-shadow: unset;
      /* outline: 0.25rem solid blue; */
      outline-offset: 0.25rem;
    `
  },
  input: {
    base: css`
      color: green;
      /* border-radius: 1rem; */
      font-size: 0.9rem;
      height: 2.00rem;
    `,
    errored: css`
      color: maroon;
    `,
    cardNumber: css`
      width: 8rem;
    `,
    expiryDate: css`
      width: 4rem;
      margin-right: 0.50rem;
      margin-left: 0.50rem;
      
    `,
    cvc: css`
      width: 2rem;
      margin-left: 0.50rem;
    `
  },
  errorText: {
    base: css`
      color: maroon;
    `
  }
};

export const stylish2 = {
  inputWrapper: {
    base: css`
      border-radius: 1rem;
      `
  },
  fieldWrapper: {
    base: css`
      margin-bottom: 1rem;
      /* border: 2px solid green; */
      border-radius: 1rem;
    `,
    inputWrapper: {
      base: css`
        border-color: orange;
        border-radius: 1rem;
      `
    },
    errored: css`
      border-color: orange;
    `,
    focused: css`
      border-color: unset;
      box-shadow: unset;
      outline-offset: 0.25rem;
    `
  },
  input: {
    base: css`
      color: green;
      /* border-radius: 1rem; */
      font-size: 0.9rem;
      height: 1.25rem;
      
    `,
    errored: css`
      color: maroon;
    `,
    cardNumber: css`
      width: 10rem;
    `,
    expiryDate: css`
      width: 10rem;
      margin-left: 0.50rem;

    `,
    cvc: css`
      width: 9rem;
      margin-left: 0.50rem;

    `
  },
  errorText: {
    base: css`
      color: maroon;
    `
  }
};

export const styles = {
  inputWrapper: {
    base: css`
      border-radius: 1rem;
      
    `
  },
  fieldWrapper: {
    base: css`
      margin-bottom: 1rem;
      /* border: 2px solid green; */
      border-radius: 1rem;
    `,
    inputWrapper: {
      base: css`
        border-color: green;
        border-radius: 1rem;
      `
    },
    errored: css`
      border-color: green;
    `,
    focused: css`
      border-color: unset;
      box-shadow: unset;
      outline: 0.25rem solid blue;
      outline-offset: 0.25rem;
    `
  },
  input: {
    base: css`
      color: green;
      border-radius: 1rem;
      font-size: 0.9rem;
    `,
    errored: css`
      color: maroon;
    `,
    cardNumber: css`
      width: 10rem;
    `,
    expiryDate: css`
      width: 5rem;
      margin-left: 0.2rem;
    `,
    cvc: css`
      width: 2rem;
    `
  },
  errorText: {
    base: css`
      color: maroon;
    `
  }
};
