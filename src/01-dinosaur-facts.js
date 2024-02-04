/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  let dinosaurObj = {};
  let longestDinosaurLength = 0;

  dinosaurs.forEach(dino => {
    if (dino.lengthInMeters > longestDinosaurLength) {
      longestDinosaurLength = dino.lengthInMeters;
      dinosaurObj = {
        [dino.name]: (longestDinosaurLength * 3.281)
      }
    }
  })
  return dinosaurObj;
}


/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  let error = `A dinosaur with an ID of '${id}' cannot be found.`
  for (const dinosaur of dinosaurs) {
    if (dinosaur.dinosaurId === id) {
      return `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur.mya[dinosaur.mya.length-1]} million years ago.`;
    }
  }
  return error;
}
console.log(getDinosaurDescription(exampleDinosaurData, 'U9vuZmgKwUr'));
/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  let arr = [];

  for (let dino of dinosaurs) {
      let oneDateBool = dino.mya.length === 1 && (dino.mya[0] === mya || dino.mya[0] - 1 === mya);
      let twoDatesBool = dino.mya.length === 2 && mya >= dino.mya[1] && mya <= dino.mya[0];

      if (oneDateBool) {
        pushToArray(arr, key, dino)
      }
      else if (twoDatesBool) {
        pushToArray(arr, key, dino)
      }
  }
  return arr;
}

/// Helper Function
function pushToArray(arr, key, dino){
  if (!key || !(key in dino)) {
    arr.push(dino.dinosaurId);
   }
  else {
    arr.push(dino[key]);
   }
}


// Added function: Selects a random dinosaur from the Dinosaur Museum and generates a fun fact to output to the user.
function getRandomDinosaur() { // selects random dinosaur object from dinosaur data
  const index = Math.floor(Math.random() * dinosaurs.length);
  return dinosaurs[index];
}

function getRandomDinosaurFunFact(randomDinosaur) { // displays fun fact based off of the selected dinosaur
  switch (randomDinosaur.name) {
    case 'Allosaurus':
      return 'Did you know that Allosaurus had a strong bite force and serrated teeth, making it a formidable predator in the Late Jurassic?';
    case 'Apatosaurus':
      return 'Did you know that Apatosaurus, despite its massive size, had a relatively small head? Its long neck and tail balanced out its body.';
    case 'Brachiosaurus':
      return 'Did you know that Brachiosaurus had an elongated neck that allowed it to feed on vegetation high above the ground, much like a giraffe?';
    case 'Compsognathus':
      return 'Did you know that Compsognathus was one of the smallest known dinosaurs, about the size of a chicken, but it was a swift and agile predator?';
    case 'Dracorex':
      return 'Did you know that Dracorex, with its dragon-like name, was discovered with a skull that resembled a mythical dragon, featuring spikes and bumps?';
    case 'Elasmosaurus':
      return 'Did you know that Elasmosaurus was a marine reptile with an extremely long neck, accounting for more than half of its total length?';
    case 'Giraffatitan':
      return 'Did you know that Giraffatitan was closely related to Brachiosaurus and had a similar structure, with an elevated posture and long neck?';
    case 'Indosuchus':
      return 'Did you know that Indosuchus had a crested skull and was a theropod dinosaur, likely resembling a mix of a bird and a fearsome predator?';
    case 'Jingshanosaurus':
      return 'Did you know that Jingshanosaurus was a small herbivorous dinosaur with a long neck and bipedal stance, roaming the Early Cretaceous landscape?';
    case 'Khaan':
      return 'Did you know that Khaan was a small, feathered dinosaur belonging to the oviraptorosaur group, known for its bird-like features?';
    case 'Minmi':
      return 'Did you know that Minmi was a small, armored dinosaur with bony plates on its back, providing protection against potential predators?';
    case 'Ouranosaurus':
      return 'Did you know that Ouranosaurus had a sail-like structure on its back, possibly used for temperature regulation or display during the Early Cretaceous?';
    case 'Parasaurolophus':
      return 'Did you know that Parasaurolophus had a distinctive crest on its head, which may have been used for communication through unique sounds?';
    case 'Spinosaurus':
      return 'Did you know that Spinosaurus was a semi-aquatic dinosaur with adaptations for swimming, including a long crocodile-like snout?';
    case 'Tyrannosaurus':
      return 'Did you know that Tyrannosaurus rex, or T. rex, had one of the strongest bites of any land animal, capable of crushing bone with its powerful jaws?';
    case 'Utahraptor':
      return 'Did you know that Utahraptor was a feathered dinosaur and a close relative of Velociraptor, showcasing the early evolution of feathers in theropods?';
    case 'Vulcanodon':
      return 'Did you know that Vulcanodon was an early sauropod dinosaur with a long neck and tail, representing the herbivorous giants of the Early Jurassic?';
    case 'Xenoceratops':
      return 'Did you know that Xenoceratops had a frill and horns on its head, making it one of the unique ceratopsians from the Late Cretaceous?';
    case 'Zephyrosaurus':
      return 'Did you know that Zephyrosaurus was a small, bipedal dinosaur with a long tail, likely darting around in the Late Cretaceous landscape?';
  }
}
// Test
const randomDinosaur = getRandomDinosaur();
const funFact = getRandomDinosaurFunFact(randomDinosaur);

console.log(funFact);

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
