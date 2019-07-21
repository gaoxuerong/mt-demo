<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo"
        />
        <span class="login">
          <em class="bold">已有美团账号?</em>
          <a href="/login">
            <el-button
              type="primary"
              size="small"
            >登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item
          label="昵称"
          prop="name"
        >
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="ruleForm.email" />
          <el-button
            size="mini"
            round
            @click="sendMsg"
          >
            发送验证码
          </el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code"
        >
          <el-input
            v-model="ruleForm.code"
            maxlength="4"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd"
        >
          <el-input
            v-model="ruleForm.pwd"
            type="password"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cpwd"
        >
          <el-input
            v-model="ruleForm.cpwd"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register"
          >
            同意以下协议并注册
          </el-button>
          <div class="error">
            {{ error }}
          </div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank"
          >《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  layout: 'blank',
  data() {
    return {
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '创建密码',
            trigger: 'blur'
          }
        ],
        cpwd: [
          {
            required: true,
            message: '确认密码',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    sendMsg() {
      const that = this
      let namePass
      let emailPass
      if (this.timerid) {
        return false
      }
      this.$refs.ruleForm.validateField('name', (valid) => {
        namePass = valid
      })
      if (namePass) {
        return false
      }
      this.$refs.ruleForm.validateField('email', (valid) => {
        emailPass = valid
      })
      this.statusMsg = ''
      if (!namePass && !emailPass) {
        that.$axios
          .post('/users/verify', {
            username: encodeURIComponent(that.ruleForm.name),
            email: that.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60
              that.statusMsg = `验证码已发送，剩余${count--}秒`
              that.timerid = setInterval(() => {
                that.statusMsg = `验证码已发送，剩余${count--}秒`
                if (count === 0) {
                  clearInterval(that.timerid)
                  that.statusMsg = ''
                }
              }, 1000)
            } else {
              that.statusMsg = data.msg
            }
          })
      }
    },
    register() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post('/users/signup', {
              username: window.encodeURIComponent(this.ruleForm.name),
              password: CryptoJS.MD5(this.ruleForm.pwd).toString(),
              email: this.ruleForm.email,
              code: this.ruleForm.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = '/login'
                } else {
                  this.error = data.msg
                }
              } else {
                this.error = `服务器出错，错误码:${status}`
              }
              setTimeout(() => {
                this.error = ''
              }, 1500)
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "../assets/css/register/index.less";
</style>
