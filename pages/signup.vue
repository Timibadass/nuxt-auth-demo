<template>
	<div class="signup">
		<AuthForm :loading="loading" @submit="register" title="Sign up" />
		<p class="signup__text">
			Already registered?
			<nuxt-link :to="{ name: 'login' }">Log in</nuxt-link>
		</p>
	</div>
</template>

<script setup>
import AuthForm from "@/components/AuthForm.vue";

const loading = ref(false);
const router = useRouter();

const register = async (body) => {
	loading.value = true;
	try {
		await $fetch("/api/auth/signup", {
			method: "POST",
			body,
		});
		router.push({name: 'Dashboard'})
		loading.value = false;
	} catch (error) {
		alert(error.statusMessage || error);
		loading.value = false;
	}
};
</script>

<style lang="scss" scoped>
.signup {
	width: 100%;
	padding: 50px;
	max-width: 400px;
	margin: auto;
	color: #333333;
  &__text {
    text-align: right;
    & a {
      text-decoration: underline;
      color: inherit;
    }
  }
}
</style>
