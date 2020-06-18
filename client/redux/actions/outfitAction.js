import * as actionType from './actionsTypes';
import axios from 'axios';

export const addOutfitAction = (outfit) => {
  let results = JSON.parse(window.localStorage.getItem('outfits'));
  if (results === null) {
    results = [];
  }
  else {
    results = results.filter((ele) => {
      return outfit.results.id !== ele.results.id
    })
  }
  results.push(outfit);
  window.localStorage.setItem('outfits', JSON.stringify(results));
  return {
    type: actionType.addOutfit,
    results: results,
  }
}

export const removeOutfitAction = (id) => {
  let results = JSON.parse(window.localStorage.getItem('outfits'));
  results = results.filter((ele) => {
    return id !== ele.results.id
  })
  window.localStorage.setItem('outfits', JSON.stringify(results));
  return {
    type: actionType.removeOutfit,
    id: id,
  }
}
export const updateOutfit = () => {
  let results = JSON.parse(window.localStorage.getItem('outfits'));
  if (results === null) {
    results = [];
  }
  return {
    type: actionType.updateOutfit,
    results: results,
  }
}


export const fetchOutfit = (id, styles) => {
  return dispatch => {
    let promised = [];
    promised.push(
    axios.get(`http://18.224.200.47/products/${id}`), axios.get(`http://18.224.200.47/reviews/${id}/meta`))    
    return Promise.all(promised)
    .then((results) => {
      let data = {
        results: results[0].data,
        ratings: results[1].data.ratings,
        styles: styles
      }
        dispatch(addOutfitAction(data))
      })
      .catch((err) => console.error(err));
  }
}