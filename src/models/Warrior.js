var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "./Identifiers";
var Ninja = (function () {
    function Ninja(weapon) {
        this.name = "Ninja";
        this.weapon = weapon;
    }
    return Ninja;
}());
Ninja = __decorate([
    injectable(),
    __param(0, inject(SERVICE_IDENTIFIER.WEAPON)),
    __metadata("design:paramtypes", [Object])
], Ninja);
var Samurai = (function () {
    function Samurai(weapon) {
        this.name = "Samurai";
        this.weapon = weapon;
    }
    return Samurai;
}());
Samurai = __decorate([
    injectable(),
    __param(0, inject(SERVICE_IDENTIFIER.WEAPON)),
    __metadata("design:paramtypes", [Object])
], Samurai);
export { Ninja, Samurai };
