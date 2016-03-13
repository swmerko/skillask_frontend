/**
 * Created by erko on 12/03/16.
 */
export async function setLocalForage(key, value) {
  var localForage = require('localforage');
  return await localForage.setItem(key, value).then(function () {
    console.log(key + ' is set');
  }, function (error) {
    console.error(error);
  });
}

export async function getLocalForage(key) {
  var localForage = require('localforage');
  return await localForage.getItem(key).then(function (object) {
    console.log(key + ' is got');
    return object;
  }, function (error) {
    console.error(error);
  });
}

export function logger(object) {
  console.log(object);
}