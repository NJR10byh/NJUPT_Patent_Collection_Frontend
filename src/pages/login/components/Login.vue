<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="loginData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'password'">
      <t-form-item name="username">
        <t-input
          v-model="loginData.username"
          size="large"
          placeholder="请输入账号：admin"
        >
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="loginData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="请输入登录密码：admin"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon
              :name="showPsw ? 'browse' : 'browse-off'"
              @click="showPsw = !showPsw"
            />
          </template>
        </t-input>
      </t-form-item>
    </template>

    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button block size="large" type="submit"> 登录</t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { FormInstanceFunctions, MessagePlugin } from "tdesign-vue-next";
import { useCounter } from "@/hooks";
import { useUserStore } from "@/store";

const userStore = useUserStore();

const FORM_RULES = {
  phone: [{ required: true, message: "手机号必填", type: "error" }],
  username: [{ required: true, message: "账号必填", type: "error" }],
  password: [{ required: true, message: "密码必填", type: "error" }],
  verifyCode: [{ required: true, message: "验证码必填", type: "error" }]
};

const type = ref("password");

const form = ref<FormInstanceFunctions>();
const loginData = ref({
  username: "root",
  password: "abc123123"
});
const showPsw = ref(false);

const [countDown, handleCounter] = useCounter();

const switchType = (val: string) => {
  type.value = val;
};

const router = useRouter();

/**
 * 发送验证码
 */
const sendCode = () => {
  form.value.validate({ fields: ["phone"] }).then((e) => {
    if (e === true) {
      handleCounter();
    }
  });
};

const onSubmit = async ({ validateResult }) => {
  if (validateResult === true) {
    try {
      await userStore.login(loginData.value);
      //
      // MessagePlugin.success("登录成功");
      // router.push({
      //   path: "/dataCenter/achievement"
      // });
    } catch (e) {
      console.log(e);
      MessagePlugin.error(e.message);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../index.less");
</style>
