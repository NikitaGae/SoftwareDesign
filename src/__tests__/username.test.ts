import User from "./../user";

describe("Check person class", () => {
  let usernameTrue: string = "nikita";
  let usernameFalse: string = "Nikita Gärtner";
  let passwordTrue: string = "Nikita123";
  let passwordFalse: string = "_Nikita123_";

  test("Test 1: Check, if username and password match the registration criteria", () => {
    expect(User.regEx(usernameTrue)).toBe(true);
    expect(User.regEx(usernameFalse)).toBe(false);
    expect(User.regEx(passwordTrue)).toBe(true);
    expect(User.regEx(passwordFalse)).toBe(false);
  });
});