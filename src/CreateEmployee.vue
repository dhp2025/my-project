<template>
  <div id="new-employee" class="container">
    <h3>New Employee</h3>
    <br>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
      <div class="row">
        <div class="col-md-14">
          <b><label>Employee ID: </label></b>&nbsp;&nbsp;
          <input type="text" v-model="employee_id" 
          required>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-14">
          <b><label>Name:</label></b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" v-model="name" 
          required>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-14">
          <b><label>Department:</label></b>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" v-model="dept" 
          required>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-14">
          <b><label>Position: </label></b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
import { doc, deleteDoc, collection, addDoc } from "firebase/firestore";
export default {
  name: 'new-employee',
  data () {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null
      
    }
  },
  methods: {
    async saveEmployee () {
      const docRef = await addDoc(collection(db,'employees'), {
        employee_id: this.employee_id,
        name: this.name,
        dept: this.dept,
        position: this.position
      })
      .then(docRef => this.$router.push('/dashboard'))
      .catch(error => console.log(err))
    }
  }

}
</script>

<style>

</style>
