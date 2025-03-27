import { test, expect } from '@playwright/test';

export function carTestCollection() {
    test("Create a new car", async ({ request }) => {
        // Step 1: Register a user
        const user = {
            name: "Car Creator",
            email: "createcar@example.com",
            password: "securePassword123"
        };

        const registerRes = await request.post('/api/user/register', { data: user });
        const registerJson = await registerRes.json();
        expect(registerRes.status()).toBe(201);

        // Step 2: Log in to get JWT token
        const loginRes = await request.post('/api/user/login', {
            data: { email: user.email, password: user.password }
        });
        const loginJson = await loginRes.json();
        const token = loginJson.data.token;
        const userId = loginJson.data.userId;

        // Step 3: Define and create the car
        const newCar = {
            brand: "Toyota",
            model: "Supra",
            engine: "3.0L Turbo",
            year: 2022,
            imageURL: "https://example.com/toyota-supra.jpg",
            price: 55000,
            stock: 3,
            isOnDiscount: false,
            discountPct: 0,
            _createdBy: userId
        };

        const carRes = await request.post('/api/cars', {
            data: newCar,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const carJson = await carRes.json();

        // Step 4: Assertions
        expect(carRes.status()).toBe(201);
        expect(carJson._id).toBeDefined();
        expect(carJson.brand).toBe("Toyota");
        expect(carJson._createdBy).toBe(userId);
    });

    test("Get all cars", async ({ request }) => {
        const res = await request.get('/api/cars');
        const json = await res.json();

        expect(res.status()).toBe(200);
        expect(Array.isArray(json)).toBe(true);
    });

    test("Authenticated user can update a car by its ID", async ({ request }) => {
        // Step 1: Register user
        const user = {
            name: "Car Updater",
            email: "updatecar@example.com",
            password: "securePassword123",
        };
    
        const registerRes = await request.post("/api/user/register", { data: user });
        expect(registerRes.status()).toBe(201);
    
        // Step 2: Login
        const loginRes = await request.post("/api/user/login", {
            data: { email: user.email, password: user.password },
        });
        const loginJson = await loginRes.json();
        const token = loginJson.data.token;
        const userId = loginJson.data.userId;
    
        // Step 3: Create car
        const carRes = await request.post("/api/cars", {
            data: {
                brand: "Mazda",
                model: "MX-5",
                engine: "2.0L",
                year: 2021,
                imageURL: "https://example.com/mx5.jpg",
                price: 30000,
                stock: 2,
                isOnDiscount: false,
                discountPct: 0,
                _createdBy: userId,
            },
            headers: { 
                "auth-token": token,
            }
            
        });
    
        const createdCar = await carRes.json();
        expect(carRes.status()).toBe(201);
    
        // Step 4: Update car
        const updates = { price: 28000 };

        const updateRes = await request.put(`/api/cars/${createdCar._id}`, {
            data: updates,
            headers: { 
                "auth-token": token,
            }
        });
        
        //const updateJson = await updateRes.json();
        
        expect(updateRes.status()).toBe(200);
        //expect(updateJson.price).toBe(updates.price);
    });

    test("Authenticated user can delete a car by its ID", async ({ request }) => {
        // Step 1: Register user
        const user = {
            name: "Car Deleter",
            email: "deletecar@example.com",
            password: "securePassword789",
        };

        const registerRes = await request.post("/api/user/register", { data: user });
        expect(registerRes.status()).toBe(201);

        // Step 2: Login
        const loginRes = await request.post("/api/user/login", {
            data: { email: user.email, password: user.password },
        });
        const loginJson = await loginRes.json();
        const token = loginJson.data.token;
        const userId = loginJson.data.userId;

        // Step 3: Create a car to delete later
        const carRes = await request.post("/api/cars", {
            data: {
                brand: "BMW",
                model: "M3",
                engine: "3.0L Twin Turbo",
                year: 2020,
                imageURL: "https://example.com/bmw-m3.jpg",
                price: 70000,
                stock: 1,
                isOnDiscount: false,
                discountPct: 0,
                _createdBy: userId,
            },
            headers: {
                "auth-token": token,
            },
        });

        const createdCar = await carRes.json();
        expect(carRes.status()).toBe(201);

        // Step 4: Delete the car
        const deleteRes = await request.delete(`/api/cars/${createdCar._id}`, {
            headers: {
                "auth-token": token,
            },
        });

        expect(deleteRes.status()).toBe(200);
        expect(await deleteRes.text()).toBe("Car deleted successfully");

        // Step 5: Confirm if it's gone
        const getRes = await request.get(`/api/cars/${createdCar._id}`);
        const getJson = await getRes.json();

        expect(getRes.status()).toBe(200);
        expect(getJson.length).toBe(0);
    });
}