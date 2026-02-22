import { render, screen } from "@testing-library/react";
import TestingComponent from "../components/TestingComponent.jsx";

describe("TestingComponent", () => {
  test("renders the testing component", () => {
    render(<TestingComponent />);

    expect(screen.getByTestId("testing-component")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /testing component/i }),
    ).toBeInTheDocument();
  });
});
