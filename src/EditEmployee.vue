<template>
  <div id="edit-employee" class="container">
    <h2>Edit Employee</h2>
    <br>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
      <div class="row">
        <div class="col-md-14">
          <label>Employee ID:</label>&nbsp;&nbsp;
          <input disabled type="text" v-model="employee_id" 
          required>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-14">
          <label>Name:</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" v-model="name" 
          required>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-14">
          <label>Department:</label>
          &nbsp;&nbsp;&nbsp;
          <input type="text" v-model="dept" 
          required>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-14">
          <label>Position: </label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          <input type="text" v-model="position" 
          required>
        </div>
      </div>
      <br>
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button type="submit" class="btn btn-outline-primary">Submit</button>&nbsp;
      <router-link to="/dashboard" class="btn btn-outline-danger">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import { doc, updateDoc, collection } from "firebase/firestore";
import { where, query, getDocs } from "firebase/firestore";
import router from '@/router';
export default {
  name: 'edit-employee',
  data () {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null
    }
  },
  async beforeRouteEnter(to, from, next) {
    if(!to.params.employee_id) return;
    const q = query(collection(db,"employees"), where("employee_id", "==", to.params.employee_id));
    const querySnapshot = await getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        next(vm => {
          vm.employee_id = doc.data().employee_id
          vm.name = doc.data().name
          vm.dept = doc.data().dept
          vm.position = doc.data().position
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    async fetchData () {
    if(!this.$route.params.employee_id) return;
    const q = query(collection(db,"employees"), where('employee_id', '==', this.$route.params.employee_id));
    this.docRef = q;
    const querySnapshot = await getDocs(q)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.employee_id = doc.data()
          .employee_id
          this.name = doc.data().name
          this.dept = doc.data().dept
          this.position = doc.data().position
        })
    })
  },
  updateEmployee () {
    const q = query(collection(db,"employees"), where('employee_id', '==', this.$route.params.employee_id));
    const querySnapshot = getDocs(q)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, {
            employee_id: this.employee_id,
            name: this.name,
            dept: this.dept,
            position: this.position
          })
          alert("Data updated");
        })
        /*.then(() => {
          this.$router.push("/view-employee");
        })*/
    })
    this.$router.push("/dashboard");
  }
  }
}
</script>

<style>

</style>