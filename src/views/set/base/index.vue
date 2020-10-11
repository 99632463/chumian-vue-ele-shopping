<template>
  <div
    class="bg-white px-3"
    style="
      padding-top: 10px;
      margin: -20px;
      margin-top: -4px;
      margin-bottom: 0 !important;
    "
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="注册与访问" name="first">
        <el-form ref="form" :model="form" label-width="160px">
          <el-form-item label="是否允许注册会员">
            <el-radio-group v-model="form.reg_type" size="mini">
              <el-radio-button label="username">普通注册</el-radio-button>
              <el-radio-button label="phone">手机注册</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="最小密码长度">
            <el-input
              v-model="form.password_length"
              placeholder="最小密码长度"
            ></el-input>
          </el-form-item>
          <el-form-item label="强制密码复杂度">
            <el-checkbox-group v-model="form.password_entrypt" size="mini">
              <el-checkbox-button label="0">数字</el-checkbox-button>
              <el-checkbox-button label="1">小写字母</el-checkbox-button>
              <el-checkbox-button label="2">大写字母</el-checkbox-button>
              <el-checkbox-button label="3">符号</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="上传设置" name="second">
        <el-form ref="form" :model="form" label-width="160px">
          <el-form-item label="默认上传方式">
            <el-radio-group v-model="form.upload_method" size="mini">
              <el-radio-button label="local">本地存储</el-radio-button>
              <el-radio-button label="qiniu">七牛云</el-radio-button>
              <el-radio-button label="oss">阿里oss</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Bucket">
            <el-input
              v-model="form.Bucket"
              size="mini"
              style="width: 25%"
              placeholder="Bucket"
            ></el-input>
          </el-form-item>
          <el-form-item label="ACCESS_KEY">
            <el-input
              v-model="form.ACCESS_KEY"
              size="mini"
              style="width: 25%"
              placeholder="ACCESS_KEY"
            ></el-input>
          </el-form-item>
          <el-form-item label="SECRET_KEY">
            <el-input
              v-model="form.SECRET_KEY"
              size="mini"
              style="width: 25%"
              placeholder="SECRET_KEY"
            ></el-input>
          </el-form-item>
          <el-form-item label="http">
            <el-input
              v-model="form.http"
              size="mini"
              style="width: 25%"
              placeholder="http"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="api安全" name="third">
        <el-form ref="form" :model="form" label-width="160px">
          <el-form-item label="是否开启api安全">
            <el-radio-group v-model="form.api" size="mini">
              <el-radio-button :label="1">是</el-radio-button>
              <el-radio-button :label="0">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="密钥">
            <el-input
              v-model="form.api_key"
              size="mini"
              style="width: 25%"
              placeholder="密钥"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        isreg: 1,
        reg_type: "username",
        password_length: "",
        password_entrypt: ["0"],
        upload_method: "local",
        Bucket: "",
        ACCESS_KEY: "",
        SECRET_KEY: "",
        http: "",
        api: '',
        api_key: ''
      },
      activeName: "first",
    };
  },
};
</script>

<style lang='scss' scoped>
</style>