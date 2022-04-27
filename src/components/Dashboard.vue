<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li v-for="employee in employees" 
      v-bind:key="employee.id" class="collection-item">
      <div class="chip">{{employee.dept}} {{employee.employee_id}}: {{employee.name}}</div>
      <router-link class="secondary-content" v-bind:to="{ name: 'view-employee', params: { employee_id: employee.employee_id }}">
        <button>View</button>
        </router-link></li>
    </ul>
    <router-link to="/new"><button>Create</button></router-link>
  </div>
</template>

<script>
import database from 'firebase/app';
import db from './firebaseInit'
import {doc,collection, orderBy, getDocs, query, onSnapshot } from "firebase/firestore";
export default {
  name: 'dashboard',
  data () {
    return {
      employees: [],
      loading: true
    }
  },
  async created () {
    const q = collection(db, 'employees')
    const order1 = query(q, orderBy("employee_id"));
      const querySnapshot = await getDocs(order1)
        .then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach(doc => {
          const data = {
            'id' : doc.id,
            'employee_id' : doc.data().employee_id,
            'name' : doc.data().name,
            'dept' : doc.data().dept,
            'position' : doc.data().position 
        }
        this.employees.push(data)

        });
      });
  } 
}
</script>

<style>

</style>