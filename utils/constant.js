"use strict";

let constants = {}

constants.append = (items, prefix) => {
    items.forEach(element => {
        let name = element.toUpperCase();
        if(prefix){
            name = prefix + "_" + name; 
        }
        constants[name] = element;
    });
}

constants.append([
    "admin",
    "user",
    "guest"
], "ROLES");

module.exports = constants;