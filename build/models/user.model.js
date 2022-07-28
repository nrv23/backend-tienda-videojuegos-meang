"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, lastName, email, password, role, birthDate, registerDate) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
        this.email = email;
        this.birthDate = birthDate;
        this.registerDate = registerDate;
    }
}
exports.User = User;
