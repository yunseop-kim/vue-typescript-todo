import { Container } from "inversify";
import "reflect-metadata";
import SERVICE_IDENTIFIER from "../models/Identifiers";
import { Ninja } from "../models/Warrior";
import { Shuriken } from "../models/Weapon";
var container = new Container();
container.bind(SERVICE_IDENTIFIER.WARRIOR).to(Ninja);
container.bind(SERVICE_IDENTIFIER.WEAPON).to(Shuriken);
export default container;
