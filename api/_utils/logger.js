"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.pinoHttpLogger = void 0;
const pino_http_1 = __importDefault(require("pino-http"));
let pinoOptions = {};
if (process.env.NODE_ENV === 'development') {
    pinoOptions = {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    };
}
const pinoHttpLogger = (0, pino_http_1.default)(pinoOptions);
exports.pinoHttpLogger = pinoHttpLogger;
const logger = pinoHttpLogger.logger;
exports.logger = logger;
//# sourceMappingURL=logger.js.map