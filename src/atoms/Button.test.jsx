import { describe, it, expect, vi } from "vitest";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("shows the button text", () => {
    render(<Button buttonText="Test String"></Button>);
    expect(screen.getByText("Test String")).toBeInTheDocument();
  });

  it("renders the light theme", () => {
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
  it("renders the dark theme", () => {
    render(
      <Button
        buttonText="Test String"
        theme="dark"
      ></Button>
    );
    expect(screen.getByText("Test String")).toHaveClass(
      "border-daobook-amber bg-daobook-amber text-white dark:border-daobook-amber-dark transition-colors transition-transform hover:scale-105 hover:bg-daobook-amber/80 focus:ring"
    );
  });
  it("renders the neutral theme", () => {
    render(
      <Button
        buttonText="Test String"
        theme="neutral"
      ></Button>
    );
    expect(screen.getByText("Test String")).toHaveClass(
      "border-[#E3E3E3] bg-white text-black dark:text-white dark:bg-black/50 transition-colors transition-transform hover:scale-105 hover:bg-black/5 focus:ring dark:hover:bg-black/70"
    );
  });

  it("renders the inverted theme", () => {
    render(
      <Button
        buttonText="Test String"
        theme="inverted"
      ></Button>
    );
    expect(screen.getByText("Test String")).toHaveClass(
      "border-white bg-daobook-amber text-white dark:border-black dark:text-black transition-colors transition-transform hover:scale-105 focus:ring hover:bg-daobook-amber/80"
    );
  });

  it("renders the right width", () => {
    render(
      <>
        <Button
          buttonText="Full Width"
          isFullWidth={true}
        ></Button>
        <Button
          buttonText="Normal Width"
          isFullWidth={false}
        ></Button>
      </>
    );
    expect(screen.getByText("Full Width")).toHaveClass("w-full");
    expect(screen.getByText("Normal Width")).toHaveClass("w-32");
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
