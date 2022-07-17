"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./../user"));
describe("Check person class", () => {
    let username = "Nikita Gärtner";
    let password = "Nikita123";
    test("Test 2: Check values", () => {
        expect(user_1.default.regEx(username)).toBe(username);
        expect(user_1.default.regEx(password)).toBe(password);
    });
    test("Test 3: Validate username", () => {
        expect(user_1.default.regEx(user_1.default.regEx(username).toString())).toBeTruthy();
        expect(user_1.default.regEx("Nikita_")).toBeFalsy();
    });
});
//# sourceMappingURL=test.js.map