<template>
  <form @submit.prevent="submit" class="auth__form">
    <h1 class="auth__heading">{{title}}</h1>
    <div class="auth__div">
      <label for="username" class="form__label">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        required
        v-model="username"
        class="form__input"
      />
    </div>
    <div class="auth__div">
      <label for="password" class="form__label">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        required
        v-model="password"
        class="form__input"
      />
    </div>
    <button class="form__button" :disabled="loading">
      <template v-if="loading">please wait...</template>
      <template v-else>{{title}}</template>
    </button>
  </form>
</template>

<script setup>
const username = ref("");
const password = ref("");

defineProps({
	loading: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		required: true,
	},
});
const emit = defineEmits(["submit"]);

const submit = () => {
	const payload = {
		username: username.value,
		password: password.value,
	};
	emit("submit", payload);
};
</script>

<style lang="scss" scoped>
.auth {
	&__form {
		border: 1px solid #e0e0e0;
		padding: 20px;
		border-radius: 8px;
	}
	&__div {
		margin-bottom: 30px;
	}
}

.form {
	&__label {
		display: block;
		margin-bottom: 4px;
		max-width: 300px;
		box-sizing: border-box;
	}
	&__input {
		height: 50px;
		width: calc(100% - 20px);
		padding-left: 20px;
		border-radius: 8px;
		border: 1px solid #e0e0e0;
	}
	&__button {
		height: 50px;
		border-radius: 8px;
		background-color: #008065;
		color: #fff;
		border: 0;
		width: 100%;
		cursor: pointer;
	}
}
</style>
