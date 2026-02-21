import { fireEvent, render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList.jsx";

describe("TodoList", () => {
  test("renders correctly with initial demo todos", () => {
    render(<TodoList />);

    expect(
      screen.getByRole("heading", { name: /todo list/i }),
    ).toBeInTheDocument();

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo List")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);

    const input = screen.getByLabelText(/new todo/i);
    fireEvent.change(input, { target: { value: "Buy milk" } });

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  test("toggles a todo between completed and not completed", () => {
    render(<TodoList />);

    const todoToggle = screen.getByRole("button", {
      name: "Toggle Learn React",
    });

    // Initially not completed
    expect(todoToggle).toHaveStyle({ textDecoration: "none" });

    fireEvent.click(todoToggle);
    expect(todoToggle).toHaveStyle({ textDecoration: "line-through" });

    fireEvent.click(todoToggle);
    expect(todoToggle).toHaveStyle({ textDecoration: "none" });
  });

  test("deletes a todo item", () => {
    render(<TodoList />);

    expect(screen.getByText("Write tests")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Delete Write tests" }));

    expect(screen.queryByText("Write tests")).not.toBeInTheDocument();
  });
});
