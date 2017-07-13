import { Container } from "inversify";
import "reflect-metadata";
<<<<<<< .merge_file_Yp8i9u
import SERVICE_IDENTIFIER from "../models/Identifiers";
import Weapon from "../interfaces/Weapon";
import Warrior from "../interfaces/Warrior";
import { Ninja } from "../models/Warrior";
import { Shuriken } from "../models/Weapon";

let container: Container = new Container();

container.bind<Warrior>(SERVICE_IDENTIFIER.WARRIOR).to(Ninja);
container.bind<Weapon>(SERVICE_IDENTIFIER.WEAPON).to(Shuriken);
=======
// import SERVICE_IDENTIFIER from "../models/Identifiers";
// import Weapon from "../interfaces/Weapon";
// import Warrior from "../interfaces/Warrior";
// import { Ninja } from "../models/Warrior";
// import { Shuriken } from "../models/Weapon";

let container: Container = new Container();

// container.bind<Warrior>(SERVICE_IDENTIFIER.WARRIOR).to(Ninja);
// container.bind<Weapon>(SERVICE_IDENTIFIER.WEAPON).to(Shuriken);
>>>>>>> .merge_file_MFDjBx

export default container;
