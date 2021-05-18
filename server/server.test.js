const supertest = require("supertest");
const { app } = require("./server");
const cookieSession = require("cookie-session");

test("Logged Out users will always be redirected to welcome", () => {
    cookieSession.mockSessionOnce({
        user_Id: false,
    });
    return supertest(app)
        .get("*")
        .then((res) => {
            if (require.session) {
                expect(res.redirect).toBe("/welcome");
            }
        });
});

test("Logged in uses will go to home", () => {
    cookieSession.mockSessionOnce({
        user_Id: true,
    });
    return supertest(app)
        .get("/welcome")
        .then((res) => {
            if (require.session) {
                expect(res.redirect).toBe("/home");
            }
        });
});
