import { render } from "@testing-library/react";
import { it, describe, expect } from "vitest";

import { BrowserRouter } from "react-router-dom";

import App from "./app";

/**
 * @vitest-environment jsdom
 */
describe("App", () => {
  it("should render successfully", () => {
    const { baseElement, getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
    expect(getAllByText(/Home/gi)[0] as HTMLAnchorElement).toBeTruthy();
  });
});
