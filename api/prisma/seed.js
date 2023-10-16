"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const data_1 = require("./data");
const prisma = new client_1.PrismaClient();
const userData = data_1.fakeUsers;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Purge existing records in the database
        yield prisma.user.deleteMany();
        console.log('Deleted records in user table');
        yield prisma.task.deleteMany();
        console.log('Deleted records in task table');
        console.log(`Start seeding ...`);
        for (const u of userData) {
            const user = yield prisma.user.create({
                data: u,
                include: {
                    tasks: true, // Include all tasks in the returned object as a related record
                },
            });
            console.log(`Created user with id: ${user.id}`);
        }
        console.log(`Seeding finished.`);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=seed.js.map