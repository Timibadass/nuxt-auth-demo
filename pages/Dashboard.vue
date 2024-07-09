<template>
	<header>
		<template v-if="loggedIn">
			<p>
				Hi
				{{ user?.username }}
			</p>
			<p @click="logout">Log out</p>
		</template>
		<p v-else>Hi Guest, <nuxt-link :to="{ name: 'login' }">Login</nuxt-link></p>
	</header>
</template>

<script setup>
const { loggedIn, user, clear, fetch } = useUserSession();

fetch()
const logout = () => {
	clear();
};
</script>

<style lang="scss" scoped></style>
