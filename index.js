const abbreviations = require("./data/abbreviations.json");
const capitals = require("./data/capitals.json");
const currencies = require("./data/currencies.json");

// merge
let merged = abbreviations.map(abb => {
  const capVal = capitals.filter(cap => {
    return cap.name === abb.name;
  });
  const curVal = currencies.filter(cur => {
    return cur.name === abb.name;
  });
  let output = new Object();
  output.abbreviation = abb.abbreviation;
  output.name = abb.name;
  output.city = capVal[0].city;
  output.currency_name = curVal[0].currency_name;
  return output;
});

// sort
function mergedSort(key = "name", order = "asc", arr = merged) {
  return arr.sort((a, b) => {
    if (!a[key]) return +1;
    let comparison = a[key].localeCompare(b[key]);
    return order === "desc" ? comparison * -1 : comparison;
  });
}

// findWhere
function findWhere(obj) {
  if(typeof(obj) !== 'object') {
    return [];
  }
  const keys = Object.keys(obj);
  const returnVal = merged.filter(el => {
    switch (keys.length) {
      case 1:
        return el[keys[0]] === obj[keys[0]];
      case 2:
        return el[keys[0]] === obj[keys[0]] && el[keys[1]] === obj[keys[1]];
      case 3:
        return (
          el[keys[0]] === obj[keys[0]] &&
          el[keys[1]] === obj[keys[1]] &&
          el[keys[2]] === obj[keys[2]]
        );
      case 4:
        return (
          el[keys[0]] === obj[keys[0]] &&
          el[keys[1]] === obj[keys[1]] &&
          el[keys[2]] === obj[keys[2]] &&
          el[keys[3]] === obj[keys[3]]
        );
      default:
        return [];
    }
  });
  return returnVal;
}
//outputs true
// console.log(findWhere("foo"));

//updateWhere
function updateWhere(currentVal, newVal) {
  const newKey = Object.keys(newVal);
  const valuesToUpdate = findWhere(currentVal);
  // console.log("pre:", valuesToUpdate)
  valuesToUpdate.forEach(el => {
    el[newKey] = newVal[newKey];
  });
  // console.log("post:", valuesToUpdate);
  Object.assign(merged, valuesToUpdate);
  return valuesToUpdate;
  // console.log(TestMerge);
}

console.log(updateWhere({ city: ""}, {city: "N'A" }));
console.log(findWhere({city: "N/A"}));
console.log(updateWhere({city: null}, {city: "N'A" }));
// console.log(findWhere({city: "N/A"}).length);

module.exports = {
  merged,

  findWhere,
  mergedSort,
  updateWhere,

  abbreviations,
  capitals,
  currencies
};
