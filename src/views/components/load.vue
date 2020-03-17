<template>
  <section>
    <div class="mock">
      <div class="main">
        <span>{{ text }}</span>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      text: "申请中..."
    };
  },
  mounted() {
    let arr = ["申请中.", "申请中..", "申请中..."];
    let i = 0;
    let timer = setInterval(() => {
      i = i % 3;
      (this.text = arr[i]), i++;
    }, 500);
  }
};
</script>
<style lang="scss" scoped>
section {
  width: 100vw;
  height: 100vh;
  position: fixed;
}
.mock {
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  /* margin: 200px auto;
  text-align: center; */
  border-radius: 6px;
  background: rgba(00, 00, 00, 0.7);
  width: 100px;
  padding: 20px 10px;
  color: white;
  font-weight: bold;
  background: grey;
  margin: 0 auto;
  span{
    margin-left: 20px;
  }
}
</style>
