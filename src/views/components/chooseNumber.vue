<template>
  <div class="choose_phone_number">
    <div class="choose_content">
      <div class="choose_title">
        请您选择号码<span>（选号别纠结，以后可以免费换号）</span>
      </div>
      <div class="choose_query">
        <input id="chooseIdx" placeholder="生日、幸运数字等" />
        <img
          onclick="searchByInput()"
          class="searchNumber"
          src="images/assets/query.png"
        />
      </div>
      <div class="phone_number">
        <!-- <ul class="phone_number_ul"></ul> -->
      </div>
    </div>
    <div class="choose_change" onclick="exchangeNumber()">
      <span>换一批</span>
    </div>
    <div onclick="closeChooseNumber()" class="close">
      <img src="images/assets/close.png" />
    </div>
  </div>
</template>
