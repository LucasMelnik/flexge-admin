export default (array, id) => array.filter(item => !id || item.id === id);
