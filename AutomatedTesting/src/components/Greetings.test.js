import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Greetings from "./Greetings";

describe("Greetings Component Test Suite", () => {
  test("Hello world text test", () => {
    //Arrange
    render(<Greetings />);
    //Act
    //...nothing

    //Assert
    const helloWorldElement = screen.getByText("Hello world!");
    expect(helloWorldElement).toBeInTheDocument();
  });
  test("Good to see you text test", () => {
    render(<Greetings />);
    const outputElement = screen.getByText("good to see you", { exact: false });
    expect(outputElement).toBeInTheDocument();
  });
  test("ChangedText test", () => {
    //Arrange
    render(<Greetings />);

    //Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    //Assert
    const outputElement = screen.getByText("Changed!");
    expect(outputElement).toBeInTheDocument();
  });

  test("Does not render, good to see you text on button click", () => {
    //Arrange
    render(<Greetings />);

    //Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    //Assert
    const outputElement = screen.queryByText("good to see you", {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
});
