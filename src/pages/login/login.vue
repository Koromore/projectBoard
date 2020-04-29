<template>
  <div class="login"></div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {}
  },
  methods: {
    loginFn() {
      //优先判断缓存中是否存在token 以及用户信息
      // let storage =
      // let timestamp=new Date().getTime();
      // console.log(timestamp)

      // var user = JSON.parse(localStorage.getItem('user'))
      // let token = localStorage.getItem('token')
      // let userSign = localStorage.getItem('userSign')

      let url = window.location.href
      let aesStr = url.substring(url.lastIndexOf('?') + 1)

      if (!aesStr) {
        aesStr = localStorage.getItem('userSign')
      }

      this.$axios
        .post('/pmbs/api/login', {
          // aesStr: 'NTI3LGZ1ZmVxdWFuLDIwMjAtMDMtMDk='
          aesStr: aesStr
        })
        .then(res => {
          // console.log(res)
          if (res.data.data) {
            window.sessionStorage.setItem('isLogin', 'success')
            this.$store.commit('login', {
              token: res.data.data.token.token,
              user: res.data.data.user,
              userSign: aesStr
            })
            this.$router.push({ path: '/home' })
          } else {
            //失败就直接调回去
            this.$store.commit('clearToken')
          }
        })

    }
  },
  created() {
    this.loginFn()
  },
  mounted() {}
}
</script>
<style scoped>
.login {
  height: 100vh;
  background: url('../../../static/images/login/login_bg.png') 0 0 no-repeat
    black;
}
</style>
