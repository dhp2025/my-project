<template>
  <div id="view-employee" class="card" style="width: 250px; margin:0 auto;">
    <ul class="list-group">
      <li class="list-group-item">
        <h4>{{name}}</h4>
      </li>
      <li class="list-group-item">Employee ID: {{employee_id}}</li>
      <li class="list-group-item">Department : {{dept}}</li>
      <li class="list-group-item">Position   : {{position}}</li>
    </ul>
    </div>
    <br>
    <div>
    <router-link to="/dashboard" class="btn btn-outline-secondary">Back</router-link>&nbsp;
    <li v-for="employee in employees" v-bind:key="employee.id"> </li>
    <button @click="deleteEmployee" class="btn btn-outline-danger">Delete</button>
    &nbsp;
    <router-link v-bind:to="{name: 'edit-employee'}" class="btn btn-outline-primary">Edit</router-link>
  </div>
</template>

<script>
import db from './firebaseInit'
import { doc, deleteDoc, collection, where, query, getDocs } from "firebase/firestore";
export default {
  name: 'view-employee',
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
    async deleteEmployee (employee_id) {
      if(confirm('Are you sure?')) {
          if(!this.$route.params.employee_id) return;
          const q = query(collection(db,"employees"), where('employee_id', '==', this.$route.params.employee_id));
          const querySnapshot = await getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              deleteDoc(doc.ref);
              alert("Employee deleted")
              //this.$router.push("/dashboard")
            })
          })
          this.$router.push("/dashboard")
        }
      }
  } 
}
</script>

<style>

</style>