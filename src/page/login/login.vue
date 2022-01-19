<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="GNS">
        <el-input v-model="form.gns"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="preview">预览</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        link: "",
        gns: ""
      }
    };
  },
  methods: {
    preview() {
      //跳转时携带表单输入的内容
      const router = "http://localhost:8090/#/haveIframe";
      window.open(router, "_blank");
    }
  }
};
</script>

<style></style>
