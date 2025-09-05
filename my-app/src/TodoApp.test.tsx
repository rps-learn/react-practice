import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoProvider } from "./TodoContext";
import TodoApp from "./TodoApp";
import React from "react";

// wrapper for filter switching
function FilterableTodoApp() {
  const [filter, setFilter] = React.useState<"all" | "active" | "completed">("all");

  return (
    <>
      <TodoApp filter={filter} />
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
    </>
  );
}

describe("TodoApp", () => {
  test("renders input and add button", () => {
    render(
      <TodoProvider>
        <TodoApp filter="all" />
      </TodoProvider>
    );

    expect(screen.getByPlaceholderText(/enter todo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  test("can add a new todo", async () => {
    render(
      <TodoProvider>
        <TodoApp filter="all" />
      </TodoProvider>
    );

    const input = screen.getByPlaceholderText(/enter todo/i);
    await userEvent.type(input, "Test Todo");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  test("can toggle todo completion", async () => {
    render(
      <TodoProvider>
        <TodoApp filter="all" />
      </TodoProvider>
    );

    const input = screen.getByPlaceholderText(/enter todo/i);
    await userEvent.type(input, "Complete Me");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    const checkbox = screen.getByLabelText(/mark "Complete Me" as done/i);
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("shows and clears completed todos", async () => {
    render(
      <TodoProvider>
        <TodoApp filter="all" />
      </TodoProvider>
    );

    const input = screen.getByPlaceholderText(/enter todo/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "Todo 1");
    await userEvent.click(addButton);
    await userEvent.type(input, "Todo 2");
    await userEvent.click(addButton);

    const checkbox1 = screen.getByLabelText(/mark "Todo 1" as done/i);
    await userEvent.click(checkbox1);

    const clearButton = screen.getByRole("button", { name: /clear completed/i });
    await userEvent.click(clearButton);

    expect(screen.queryByText("Todo 1")).not.toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });

  test("filters todos correctly", async () => {
    render(
      <TodoProvider>
        <FilterableTodoApp />
      </TodoProvider>
    );

    const input = screen.getByPlaceholderText(/enter todo/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "Active Todo");
    await userEvent.click(addButton);
    await userEvent.type(input, "Completed Todo");
    await userEvent.click(addButton);

    const completedCheckbox = screen.getByLabelText(/mark "Completed Todo" as done/i);
    await userEvent.click(completedCheckbox);

    // Active filter
    await userEvent.click(screen.getByText("Active"));
    expect(screen.getByText("Active Todo")).toBeInTheDocument();
    expect(screen.queryByText("Completed Todo")).not.toBeInTheDocument();

    // Completed filter
    await userEvent.click(screen.getByText("Completed"));
    expect(screen.getByText("Completed Todo")).toBeInTheDocument();
    expect(screen.queryByText("Active Todo")).not.toBeInTheDocument();

    // All filter
    await userEvent.click(screen.getByText("All"));
    expect(screen.getByText("Active Todo")).toBeInTheDocument();
    expect(screen.getByText("Completed Todo")).toBeInTheDocument();
  });
});
