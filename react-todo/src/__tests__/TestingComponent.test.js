import { render, screen } from "@testing-library/react";
import TestingComponent from "../components/TestingComponent.jsx";

describe("TestingComponent", () => {
  test("renders the testing component", () => {
    render(<TestingComponent />);

    expect(screen.getByText("Testing Component")).toBeInTheDocument();
  });
});
