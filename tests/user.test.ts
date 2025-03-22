import { test, expect } from '@playwright/test';

export function userTestCollection() {
    test("Valid user registration info", async ({ request }) => {

        test.setTimeout(10_000);

        const user = {
            name: "Simon Jobbagy",
            email: "example@simon.com",
            password: "12346789"
        }

        const response = await request.post("/api/user/register", { data: user });
        const json = await response.json();

        expect(response.status()).toBe(201);
        expect(json.error).toEqual(null);

    });

    test("Invalid user registration info", async ({ request }) => {

        test.setTimeout(10_000);

        const user = {
            name: "Simon Jobbagy",
            email: "example@simon.com",
            password: "1234"
        }

        const response = await request.post("/api/user/register", { data: user });
        const json = await response.json();

        expect(response.status()).toBe(400);
        //console.log(json.error);
        expect(json.error).toEqual("\"password\" length must be at least 6 characters long");
    });
}