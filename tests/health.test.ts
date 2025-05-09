import { test, expect } from '@playwright/test';

export function health() {
  test("Health Check", async ({ request }) => {

    const response = await request.get("/api/");
    const json = await response.json();

    expect(response.status()).toBe(200);
    expect(json).toEqual({ message: 'Welcome to the MENTS API' });
  });
}