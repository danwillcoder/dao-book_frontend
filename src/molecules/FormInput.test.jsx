import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import FormInput from "./FormInput";

describe("Form Input", () => {
  it("shows the label text", () => {
    render(<FormInput labelText="Test String"></FormInput>);
    expect(screen.getByText("Test String")).toBeInTheDocument();
  });

  it("shows required if given", () => {
    render(
      <FormInput
        labelText="Test String"
        isRequired={true}
      ></FormInput>
    );
    expect(screen.getByText(/required/)).toBeInTheDocument();
  });

  it("shows the correct type", () => {
    render(
      <FormInput
        labelText="Test String"
        type="number"
        placeholderText="placeholder"
      ></FormInput>
    );
    screen.debug();
    expect(screen.getByPlaceholderText("placeholder")).toHaveAttribute("type");
    expect(
      screen.getByPlaceholderText("placeholder").getAttribute("type")
    ).toBe("number");
  });

  it("calls the setInputValue function", () => {
    const mockFn = vi.fn();
    render(
      <FormInput
        labelText="Test String"
        isRequired={true}
        inputValue=""
        onChange={mockFn}
        placeholderText="placeholder"
      ></FormInput>
    );
    fireEvent.change(screen.getByPlaceholderText("placeholder"), {
      target: { value: "test" },
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
