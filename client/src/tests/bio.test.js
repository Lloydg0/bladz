import Bio from "../bio";
import axios from "../axios";
import { render, waitFor, fireEvent } from "@testing-library/react";
jest.mock("../axios");

test("When no bio is passed to Bio, an 'Add bio' button is rendered", () => {
    const { container } = render(<Bio />);
    expect(container.querySelector("button").innerHTML).toBe("Add Bio");
});

test("When a bio is passed to Bio, an 'Edit bio' button is rendered", () => {
    const { container } = render(<Bio bio="New Bio" />);
    expect(container.querySelector("button").innerHTML).toBe("Add Bio");
});

test("Clicking the 'Add bio' button causes a textarea and a 'Save' button to be rendered", () => {
    const { container } = render(<Bio />);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toBe("Save Bio");
});

test("Clicking the 'Edit bio' button causes a textarea and a 'Save' button to be rendered", () => {
    const { container } = render(<Bio bio="New Bio" />);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toBe("Save Bio");
});

test("Clicking the 'Save' button causes an ajax request if bio has been changed", async () => {
    axios.post.mockResolvedValue({
        data: {
            bio: "Bio",
        },
    });
    const mockBio = jest.fn();
    const { container } = render(<Bio setBio={mockBio} />);
    fireEvent.click(container.querySelector("button"));
    fireEvent.change(container.querySelector("textarea"), {
        target: { value: "New Bio" },
    });
    fireEvent.click(container.querySelector("button"));
    await waitFor(() => expect(mockBio.mock.calls.length).toBe(1));
});

test("Clicking the 'Save' button does not cause an ajax request if bio has not been changed", async () => {
    const mockBio = jest.fn();
    const { container } = render(<Bio setBio={mockBio} />);
    fireEvent.click(container.querySelector("button"));
    fireEvent.click(container.querySelector("button"));
    await waitFor(() => expect(mockBio.mock.calls.length).toBe(0));
});
