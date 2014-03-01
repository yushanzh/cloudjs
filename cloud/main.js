// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("getRandomTestItem", function(request, response) {
  var query = new AV.Query("TestItem");
  query.count({
    success: function(count) {
      query.skip(Math.round(Math.random()*count));
      query.limit(1);
      query.find({
        success: function(results) {
          response.success(results[0]);
        },
        error: function(error) {
          response.error("movie lookup failed");
        }
      });
    },
    error: function(error) {
      response.error("movie lookup failed");
    }
  });
});

AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.define("test", function(request, response) {
  response.success(4.4);
});

AV.Cloud.define("testError", function(request, response) {
  response.error("hahaha")
});

AV.Cloud.define("testSuccess", function(request, response) {
    response.success();  
});

AV.Cloud.define("averageStars", function(request, response) {
  var query = new AV.Query("Review");
  query.equalTo("movie", request.params.movie);
  query.find({
    success: function(results) {
      var sum = 0;
      for (var i = 0; i < results.length; ++i) {
        sum += results[i].get("stars");
      }
      response.success(sum / results.length);
    },
    error: function() {
      response.error("movie lookup failed");
    }
  });
});

AV.Cloud.define("getArmor", function(request, response) {
  var query = new AV.Query("Armor");
  query.find({
    success: function(results) {
      if (results.length > 0) {
        response.success(results[0]);
      };
    },
    error: function() {
      response.error("movie lookup failed");
    }
  });
});

AV.Cloud.define("getArmors", function(request, response) {
  var query = new AV.Query("Armor");
  query.find({
    success: function(results) {
      response.success(results);
    },
    error: function() {
      response.error("movie lookup failed");
    }
  });
});

AV.Cloud.define("abtesting",function(request,respone){
    var query = new AV.Query("App");
    query.equalTo("app", "flappy bird",{
     success:function(results) {
      var len = results.length;
      if(len <1){
          alert("Query Error");
      }
      var object = results[0];
      var shareA = object['shareA'];
      var rand = Math.random()*100;
      if(0<=rand<shareA){
          return '{"expname":"A","share":"'+object['shareA']+'","pipehight":"'+ object['pipehightA']+'"}';
      }else{
        return '{"expname":"B","share":"'+object['shareB']+'","pipehight":"'+ object['pipehightB']+'"}';
      }
    },
   error:function(error) {
    alert("Error: " + error.code + " " + error.message);
   }});

    
});







