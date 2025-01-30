<script setup lang="ts">
import {useForm} from "vee-validate";
import * as yup from "yup";

definePageMeta({
  layout: 'blank'
})

const router = useRouter()
const authStore = useAuthStore()
const { showSuccessMessage, showErrorMessage } = useMessages()

const isLoading = ref<boolean>(false)

const {errors, handleSubmit, defineField, setErrors} = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  }),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async values => {
  isLoading.value = true
  const { data, error } = await authStore.login(values)
  if (error && error.value) {
    console.log(error.value.data)
    if (error.value.data.statusCode === 422) {
      setErrors(error.value.data.message)
    } else {
      setErrors({
        "email": [
          error.value.data.message
        ]
      })
    }
    showErrorMessage('Invalid email or password')
  } else {
    showSuccessMessage('Login successful')
    await router.push('/')
  }
  isLoading.value = false
});

</script>
<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold">
        BD Funnel Builder
      </a>
      <div
          class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
              <InputText type="text" v-model="email" v-bind="emailAttrs" :invalid="!!errors.email" fluid/>
              <Message v-if="errors.email" severity="error" size="small" variant="simple">{{ errors.email}}</Message>
            </div>
            <div>
              <label for="Password" class="block mb-2 text-sm font-medium">Your password</label>
              <Password toggleMask :feedback="false" v-model="password" v-bind="passwordAttrs" :invalid="!!errors.password" fluid/>
              <Message v-if="errors.password" severity="error" size="small" variant="simple">{{ errors.password}}</Message>
            </div>
            <Button :disabled="isLoading" type="submit" :loading="isLoading" raised fluid>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>