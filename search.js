module.exports = function getSearchResults (cb) {
  request({
    uri: 'http://developer.myntra.com/v2/search/data/men-casual-shirts?userQuery=false&rows=2',
    method: 'GET',
    encoding: null
  }, (err, response) => {
    if (err) return cb(err)
    var search_response = JSON.parse(body);
    console.log("response:" + search_response);
    var products = search_response.data.results.products;
    console.log(products);
    var first_product = products[0].product;
    var first_product_img = products[0].search_image;
    var first_product_price = products[0].discounted_price;
    return cb(null, {
            title: first_product,
            price: first_product_price,
            image: first_product_img,
          })
    })
} 
    