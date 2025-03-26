process.env.NODE_ENV = 'test';
import { test } from '@playwright/test';

import { health } from './health.test';
import { userTestCollection } from './user.test';

import { userModel } from '../src/models/userModel';
import { carModel } from '../src/models/carModel';
import { carTestCollection } from './car.test';

import dotenvFlow from 'dotenv-flow';
import { connect, disconnect } from '../src/repository/database';
dotenvFlow.config();

function setup() {
    test.beforeEach(async () => {
        try {
            await connect();
            await userModel.deleteMany({});
            await carModel.deleteMany({});
        }
        finally {
            await disconnect();
        }
    })

    test.afterAll(async () => {
        try {
            await connect();
            await userModel.deleteMany({});
            await carModel.deleteMany({});
        }
        finally {
            await disconnect();
        }
    })
}

setup();

test.describe(health);
test.describe(userTestCollection);
test.describe(carTestCollection);