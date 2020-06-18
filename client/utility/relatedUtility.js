module.exports = {
  getDefaultImg: (stylesArr) => {
    if (!stylesArr) {
      return "NO IMAGE";
    }
    /* this function checks if the default? is equal to 1 then returns the  path*/
    let results;
    for (const ele of stylesArr) {
      if (ele['default?'] === 1) {
        results = ele.photos.filter((photo, i) => {
          return photo.thumbnail_url;
        });
      } else {
         results = ele.photos.filter((photo, i) => {
          return photo.thumbnail_url;
        });
      }
      if (results.length) {
        return results[0].thumbnail_url
      } 
      return 'No Photo Available';
    }
  },

  salePrice: (styleArr) => {
    let results = "";
    if (!styleArr) {
      return false;
    }
    styleArr.forEach((ele) => {
      if (ele["default?"] === 1) {
        if (parseInt(ele.sale_price) === 0 || !ele.sale_price) {
          results = `${parseInt(ele.original_price)}`;
        } else {
          results = `SALE ${parseInt(ele.sale_price)}`;
        }
      }
    });
    return results;
  },
  avgRatings: (ratingObj) => {
    if (!ratingObj) return 0;
    let avg;
    let votes = 0;
    let sum = 0;
    for (const key in ratingObj) {
      if (ratingObj[key]) {
        sum += parseInt(key);
        votes += parseInt(ratingObj[key]);
      }
    }
    if (sum === 0) {
      return 0;
    }
    if (votes === 0) {
      return 0;
    }

    avg = sum / votes;
    if (!Number.isInteger(avg)) {
      avg = Number(Math.ceil(avg).toFixed(1));
    }
    return avg;
  },
};
