<template>
	<div class="login">
		<AuthForm :loading="loading" @submit="login" title="Sign in" />
		<p class="login__text">
			New here?
			<nuxt-link :to="{ name: 'signup' }">Sign up</nuxt-link>
		</p>
	</div>
</template>

<script setup>
import AuthForm from "@/components/AuthForm.vue";

const loading = ref(false);
const router = useRouter();

const login = async (body) => {
	loading.value = true;
	try {
		await $fetch("/api/auth/login", {
			method: "POST",
			body,
		});
		router.push({name: 'Dashboard'})
		loading.value = false;
	} catch (error) {
		console.log({error});
		alert(error.statusMessage ||error);
		loading.value = false;
	}
};
</script>

<style lang="scss" scoped>
.login {
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
