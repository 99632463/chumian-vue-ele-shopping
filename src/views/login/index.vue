<template>
  <div class="container">
    <div class="row">
       <div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5">
         <div class="card mt-5">
           <div class="card-header bg-white">
             <h3 class="text-center mb-0 text-secondary">UNI-ADMIN</h3>
           </div>
           <div class="card-body">
             <el-form ref="ruleForm" :rules="rules" :model="form">
               <el-form-item prop="username">
                 <el-input v-model="form.username" size="medium" placeholder="请输入用户名"></el-input>
               </el-form-item>
               <el-form-item prop="password">
                 <el-input v-model="form.password" type='password' size="medium" placeholder="请输入密码"></el-input>
               </el-form-item>
               <el-form-item>
                 <el-button @click="login" type='primary' size="medium" class="w-100">立即登录</el-button>
               </el-form-item>
             </el-form>
           </div>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import {form, rules} from './form'

export default {
  name: 'login',
  data() {
    return {
      form,
      rules
    }
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(isPass => {
        if(!isPass) {
          return
        }

        this.$router.push('index')
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>