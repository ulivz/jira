<template>
  <div class="login-form">
    <Form ref="loginForm" :model="loginForm" :rules="ruleInline" inline>
      <FormItem prop="user">
        <Input type="text" v-model="loginForm.username" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="loginForm.password" placeholder="Password">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="ghost" @click="handleSubmit('loginForm')">Signin</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { login } from '../../fetch/auth'

  export default {
    name: 'LoginForm',

    data() {
      return {
        isLogining: false,

        loginForm: { username: '', password: '' },

        ruleInline: {
          username: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        }
      }
    },

    computed: {
      ...mapState([
        'loggedIn',
        'loginning',
        'networkAvailable',
        'teams'
      ])
    },
    methods: {
      handleSubmit(name) {
        if (this.networkAvailable === 0) {
          return this.$Message.error('Connected Error')
        } else if (this.networkAvailable === -1) {
          return this.$Message.error('Your current network has no permissions to access JIRA')
        }

        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loginStart()
            // Now we still are 403 Forbidden
            login(this.loginForm).then(({ status, body }) => {
              if (status === 200) {
                this.loginSuccess({ auth: body.auth, username: body.username })
              } else {
                this.$Message.error(status + ': Login failed! 😑')
                this.loginFail()
              }
            })
          } else {
            this.$Message.error('Check the login form failed, please check your input!')
          }
        })
      },
      ...mapMutations([
        'loginStart',
        'loginSuccess',
        'loginFail'
      ])
    }
  }
</script>

<style lang="scss" scoped>

  .login-form {
    opacity: 1;
    width: 440px;
    margin: 20px auto 0;
  }

  // @override
  .ivu-form {
    .ivu-form-item-error {
      .ivu-input-group-prepend {
        border: 1px solid rgba(255, 0, 0, .5);
        border-right: none;
      }
      .ivu-input {
        border: 1px solid rgba(255, 0, 0, .5);
      }
    }

    .ivu-form-item-error-tip {
      color: #fff;
    }
  }

  // @override
  .ivu-btn.ivu-btn-ghost {
    &:hover {
      color: #57a3f3;
      background-color: transparent;
      border-color: #57a3f3;
    }
  }
</style>
