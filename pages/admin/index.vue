<script lang="ts" setup>
import { onBeforeMount } from "vue"
import { useRouter } from "vue-router"

onBeforeMount(() => {
  useRouter().push("/admin/hotels")
})
</script>
