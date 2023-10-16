"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load the Express app file and listen on port
require("dotenv/config");
const app_1 = __importDefault(require("./_api/app"));
const errorHandler_1 = require("./_utils/errorHandler");
// Global error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
    errorHandler_1.errorHandler.handleUnknownError(err);
});
process.on('unhandledRejection', (err) => {
    errorHandler_1.errorHandler.handleUnknownError(err);
});
// Server startup
const port = process.env.APP_PORT || 8080;
app_1.default.listen(port, () => console.log(`
    🚀 Server ready at: http://localhost:${port}
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`));
exports.default = app_1.default;
//# sourceMappingURL=server.js.map