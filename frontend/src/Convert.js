const townToIdMap = {
    'Surrey': 1,
    'Burnaby': 2,
    'Vancouver': 3,
    'Richmond': 4,
};
  
  const idToTownMap = {
    1: 'Surrey',
    2: 'Burnaby',
    3: 'Vancouver',
    4: 'Richmond',
};
  
  function townToId(town) {
    return townToIdMap[town];
  }
  
  function idToTown(id) {
    return idToTownMap[id];
  }
  
  export { townToId, idToTown };
  