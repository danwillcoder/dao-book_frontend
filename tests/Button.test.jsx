import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Button from "../src/atoms/Button.jsx";

describe("Button", () => {
  it("shows the button text", () => {
    render(<Button buttonText="Test String"></Button>);
    expect(screen.getByText("Test String")).toBeInTheDocument();
  });

  it("renders the right theme", () => {
    render(
      <Button
        buttonText="Test String"
        theme="light"
      ></Button>
    );
    expect(screen.getByText("Test String")).toHaveClass(
      "border-daobook-amber text-daobook-amber transition-colors transition-transform hover:scale-105 hover:bg-black/75 focus:ring dark:bg-black"
    );
  });

  it("calls the callback it's given", () => {
    const clickHandler = vi.fn();

    render(
      <Button
        buttonText="Test String"
        onClick={clickHandler}
      ></Button>
    );

    fireEvent.click(screen.getByText("Test String"));

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
