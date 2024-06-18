// Login.test.js
import { jest, test, expect } from "jest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Login from "./Login";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

jest.mock("../../redux/api/usersApiSlice", () => ({
  useLoginMutation: jest.fn(),
}));

jest.mock("../../redux/features/auth/authSlice", () => ({
  setCredentials: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { userInfo: null },
    });
    useLoginMutation.mockReturnValue([
      jest.fn().mockResolvedValue({}),
      { isLoading: false },
    ]);
  });

  test("renders login form", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("allows user to submit form with correct credentials", async () => {
    const mockLogin = jest.fn().mockResolvedValue({ user: "testUser" });
    useLoginMutation.mockReturnValue([mockLogin, { isLoading: false }]);

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(setCredentials).toHaveBeenCalledWith({ user: "testUser" });
    });
  });

  test("displays error message on login failure", async () => {
    const mockLogin = jest.fn().mockRejectedValue({
      data: { message: "Invalid credentials" },
    });
    useLoginMutation.mockReturnValue([mockLogin, { isLoading: false }]);

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "wrongpassword",
      });
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});
