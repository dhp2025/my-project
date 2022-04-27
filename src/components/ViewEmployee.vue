<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{name}}</h4>
      </li>
      <li class="collection-item">Employee ID#: {{employee_id}}</li>
      <li class="collection-item">Department: {{dept}}</li>
      <li class="collection-item">Position: {{position}}</li>
    </ul>
    <router-link to="/dashboard" class="btn grey">Back</router-link>
    <li v-for="employee in employees" v-bind:key="employee.id"> </li>
    <button @click="deleteEmployee" class="btn red">Delete</button>
    
    <router-link v-bind:to="{name: 'edit-employee'}"><button>Edit</button></router-link>
  </div>
</template>

<script>
import db from './firebaseInit'
import { ref } from 'vue'
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