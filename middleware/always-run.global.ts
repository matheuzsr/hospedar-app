export default defineNuxtRouteMiddleware((context) => {
  if (context.path.includes("/login") || !context.path.includes("/admin")) return

  const tokenCookie = useCookie("token")
  if (!tokenCookie.value) useRouter().push('/admin/login')
})
