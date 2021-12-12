import "bootstrap/dist/css/bootstrap.min.css";
 import "bootstrap/dist/js/bootstrap.bundle";
 import { getRandomElement, getRandomInteger } from "./util/random"; 
 for (let i = 0; i < 10; i++) {
     console.log(getRandomInteger(0, 1));
 }
 console.log(getRandomElement(["abc", "lmn", "Vasya"]));
