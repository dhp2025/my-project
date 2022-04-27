<template>
  <div id="new-employee">
    <h3>New Employeee</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <label>Employee ID#</label>
          <input type="text" v-model="employee_id" 
          required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label>Name:</label>
          <input type="text" v-model="name" 
          required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label>Department:</label>
          <input type="text" v-model="dept" 
          required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label>Position: </label> 
          <input type="text" v-model="position" 
          required>
        </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <router-link to="/dashboard" class="btn grey">Cancel</router-link>
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
