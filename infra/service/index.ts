export async function customFetch<T>(
  url: Parameters<typeof $fetch<T>>[0],
  options?: Parameters<typeof $fetch<T>>[1]
) {
  return $fetch(url, {
    ...options,
    onRequest: (event) => {
      const tokenCookie = useCookie("token")
      const authorization = "Bearer " + tokenCookie.value
      event.options.headers.set("Authorization", authorization)
    },
    onResponseError: (event) => {
      if (event.response.status === 401) {
        useCookie("token").value = null
        useRouter().push('/admin/login')
      }
    },
  })
}
