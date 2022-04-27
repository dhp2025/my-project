<template>
  <div id="edit-employee">
    <h2>Edit Employee</h2>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <label>Employee ID#</label>
          <input disabled type="text" v-model="employee_id" 
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
import { doc, deleteDoc, setDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { where, query, getDocs, onSnapshot } from "firebase/firestore";
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