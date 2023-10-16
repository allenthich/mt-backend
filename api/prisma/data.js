"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeUsers = void 0;
const faker_1 = require("@faker-js/faker");
const bcrypt_1 = __importDefault(require("bcrypt"));
const NUM_FAKE_USERS = 1;
let fakeUsers = [];
exports.fakeUsers = fakeUsers;
const createFakeTask = () => {
    const task = {
        id: faker_1.faker.string.uuid(),
        title: faker_1.faker.word.verb(),
        description: faker_1.faker.lorem.word(),
    };
    return task;
};
const createFakeUserWithTasks = () => {
    const fakePassword = faker_1.faker.internet.password();
    const saltRounds = 10;
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const hash = bcrypt_1.default.hashSync(fakePassword, salt);
    const user = {
        id: faker_1.faker.string.uuid(),
        email: faker_1.faker.internet.email(),
        password: hash,
        name: faker_1.faker.person.firstName(),
        tasks: {
            create: [
                createFakeTask(), // Create related record
            ]
        }
    };
    return user;
};
const generateFakeData = () => {
    for (let userIndex = 0; userIndex < NUM_FAKE_USERS; userIndex += 1) {
        const newUser = createFakeUserWithTasks();
        fakeUsers.push(newUser);
    }
};
generateFakeData();
//# sourceMappingURL=data.js.map