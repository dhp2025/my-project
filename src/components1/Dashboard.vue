<template>
  <div id="dashboard" class="card" style="width: 800px; margin:0 auto;">
    <ul class="list-group">
      <li class="list-group-item">
        <h4>Employees</h4>
      </li>
      <li v-for="employee in employees" 
      v-bind:key="employee.id" class="list-group-item col-md-14">
      <div class="chip">{{employee.dept}}</div>
      {{employee.employee_id}}: {{employee.name}}
      <router-link class="secondary-content col-md-14" v-bind:to="{ name: 'view-employee', params: { employee_id: employee.employee_id }}">
      <i class="fa fa-eye"></i>
        </router-link></li>
    </ul>
  </div>
  <router-link to="/new"><i class="fa fa-plus" aria-hidden="true"></i></router-link>
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
.chip{
  display: inline-block;
  padding: 0 20px;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  border-radius: 25px;
  background-color: #f1f1f1;
}
</style>