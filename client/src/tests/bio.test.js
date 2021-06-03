import Bio from "../bio";
import axios from "../axios";
import { render, waitFor, fireEvent } from "@testing-library/react";

// 1
test("When no bio is passed to it, an Add button is rendered.", () => {
    const { container } = render(<Bio draftBio="" />);
    expect(container.querySelector("button").innerHTML).toBe("Add Bio");
});

// 2
test("When a bio is passed to it, an Edit button is rendered.", () => {
    const { container } = render(<Bio draftBio="somthing" />);
    expect(container.querySelector("button").innerHTML).toBe("Edit Bio");
});

// 3
test("Clicking either the Add or Edit button causes a textarea and a Save button to be rendered.", () => {
    const mockOnClick = jest.fn();
    const { container } = render(
        <Bio onClick={mockOnClick} showTextArea="true" />
    );

    fireEvent
        .click(container.querySelector("button").innerHTML)
        .toBe("Add Bio");
    fireEvent
        .click(container.querySelector("button").innerHTML)
        .toBe("Edit Bio");
});

// 4
jest.mock("./bio");

axios.get.mockResolvedValue({
    data: {
        showTextArea: false,
        draftBio: "",
    },
});

test("Clicking the Save button causes an ajax request.", async () => {
    const mockOnClick = jest.fn();
    const { container } = render(<Bio onClick={mockOnClick} />);

    fireEvent.click(container.querySelector("button").innerHTML).toBe("Save");

    await waitFor(() => expect(container.querySelector("button")).toBeTruthy());
});

// 5

test("When the mock request is successful, the function that was passed as a prop to the component gets called.", async () => {

    const myMock = jest.fn();

    const { container } = render(<Bio />);

    await waitFor(() => expect(containertoBeTruthy());
});
