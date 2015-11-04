angular.module("4square", [])
.factory("venuesService", function ($http, $q, FSquareAppId, FSquareAppSecret) {

  var baseurl = "https://api.foursquare.com/v2/";
  var secure = '&client_id=' + FSquareAppId + '&client_secret=' + FSquareAppSecret + "&v=20151101";

  return {
    categories: null,

    // GetCategories from 4Square and cache it in memory
    getCategories: function () {
      if (!this.categories) {
        var op = $q.defer();
        var _this = this;

        _this.categories = op.promise;
        var url = baseurl + "venues/categories?" + secure;

        $http.get(url).success(function (r) {
          op.resolve(r.response.categories);
        })
        .error(function (e) {
          console.log("Error reading 4Square categories")
          op.reject();
        });
      }
      return _this.categories;
    },
    search: function (lat, lng, categories, query) {
      var op = $q.defer();
      var _this = this;

      var url = baseurl + "venues/search?ll=" + lat + ',' + lng;
      if (categories)
        url += "&categoryId=" + categories;

      url +=secure;

      $http.get(url).success(function (r) {
        op.resolve(r.response.venues);
      })
      .error(function () {
        op.reject();
      });

      return op.promise;
    },
    get: function (id) {
      var op = $q.defer();
      var _this = this;

      var url = baseurl + "venues/" + id +"?";

      url += secure;

      $http.get(url).success(function (r) {
        op.resolve(r.response.venue);
      })
      .error(function () {
        op.reject();
      });

      return op.promise;
    }

  };

});