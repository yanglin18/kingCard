import Vue from "vue";
import Validator from "vue-validator";
Vue.use(Validator);

Vue.validator("IDcard", function(val) {
  return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
    val
  );
});

Vue.validator("name", function(val) {
  return /^[\u4E00-\u9FA5]{2,4}$/.test(val);
});


