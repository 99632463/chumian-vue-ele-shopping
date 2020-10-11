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
                 <el-button @click="submit" type='primary' size="medium" class="w-100" :loading='loading'>
                   {{loading ? '登录中' : '立即登录'}}
                 </el-button>
               </el-form-item>
             </el-form>
           </div>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {form, rules} from './form'
import loginApi from '@/api/login'

export default {
  name: 'login',
  data() {
    return {
      form,
      rules,
      loading: false
    }
  },
  methods: {
    ...mapMutations('login', [
      'login'
    ]),
    ...mapMutations('menu', [
      'createNavBar'
    ]),
    submit() {
      this.$refs.ruleForm.validate(isPass => {
        if(!isPass) {
          return
        }

        this.loading = true
        loginApi.login(this.form)
          .then(res => {
            this.login(res.data)
            this.createNavBar(res.data.tree)
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.loading = false
            this.$router.push('index')
          })
          .finally(() => {
            this.loading = false
          })
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>