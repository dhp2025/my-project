<template>
  <div class="container">
    <h1>Login</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
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
          <button @click="login" class="btn btn-primary">Login</button
          ><br /><br />
          <button @click="signWithGoogle" class="btn btn-primary">
            Login with Google
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
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();
const forgotpassword = () => {
sendPasswordResetEmail(auth, email.value)
  .then(() => {
    // Password reset email sent!
    // ..
    alert("reset email sent");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  })
};
const login = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully Logged in!");
      console.log(auth.currentUser);
      router.push('/dashboard');
    })
    .catch((error) => {
      //alert(errMsg.value);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          alert(errMsg.value);
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          alert(errMsg.value);
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          alert(errMsg.value);
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          alert(errMsg.value);
          break;
      }
    });
};
const signWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push('/dashboard');
    })
    .catch((error) => {});
};
</script>
<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  //mounted: function(){
    //if(firebase.auth().currentUser)
    //this.$router.replace("dashboard");
  //},
  methods: {
    login: function () {
      console.log("Email: " + this.email);
      console.log("Password: " + this.password);
    },
  },
};
</script>

<style scoped>
</style>