<template>
  <div class="container">
    <h1>Register</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="fullName"
              required
              placeholder="Full Name"
            />
          </div>
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              required
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
              placeholder="Password"
            />
            <div
              v-if="password.length > 1 && password.length < 6"
              class="text-danger"
            >
              Password length should be greater than 6
            </div>
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="reenterPassword"
              required
              v-model="reenterPassword"
              placeholder="Re-enter Password"
            />
            <div v-if="password != reenterPassword" class="text-danger">
              Passwords don't match
            </div>
          </div>
          <br />
          <button @click="register" class="btn btn-primary">Register</button>
          <br /><br />
          <button @click="signWithGoogle" class="btn btn-primary">
            Register with Google
          </button>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
const fullname = ref("");
const email = ref("");
const password = ref("");
const reenterPassword = ref("");
const router =useRouter()
const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
    console.log("Successfully registered!");
    console.log(auth.currentUser)
    router.push('/dashboard')
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
const signWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
  .then((result) => {
    console.log(result.user);
    router.push('/dashboard');
  })
  .catch((error) => {
    //const errorCode = error.code;
    //const errorMessage = error.message;
  });

};
</script>
<script>
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      reenterPassword: "",
    };
  },
  mounted: function(){
    if(firebase.auth().currentUser)
    this.$router.replace("dashboard");
  },
  methods: {
    register: function () {
      console.log("Email: " + this.email);
    },
  },
};
</script>

<style scoped>
</style>