<template>

  <div class="app-image">
    <div>
  <div class="logo-container">
    <img alt="logo" src="./assets/logo.png" style="width: 1050px; height:500px" >
  </div>
  <HelloWorld msg="Ankara Yıldırım Beyazıt University Schedular Portal"/>
</div>


  </div>

<div>
  
</div>

  <tr>


  </tr>
  <div class="button-container">
    <button v-if="courses.length > 0&& !scheduleCreated" @click="toggleView('showCourses')">Edit Courses</button>
    <button v-if="services.length > 0&& !scheduleCreated" @click="toggleView('showServices')">Edit Services</button>
    <button v-if="classrooms.length > 0&& !scheduleCreated" @click="toggleView('showClassrooms')">Edit Classroom</button>
    <button v-if="busyTimes.length > 0&& !scheduleCreated" @click="toggleView('showBusyTimes')">Edit Busy Times</button>
    <input type="file" @change="handleFileUpload" multiple>
    <button @click="uploadFiles"  v-if="!scheduleCreated" > Upload Files </button>
  </div>
  <div v-if="showCourses || showServices || showClassrooms || showBusyTimes">
    <div class="child" v-if="showCourses && courses.length > 0">
      <h2>Courses</h2>
      <button class="button-container" style="margin:auto" @click="addCourse">Add Courses</button> <br>
      <table class="table" v-if="showCourses && courses.length > 0">
        <thead>
        <tr>
          <th>Course Code</th>
          <th>Courses</th>
          <th>Year</th>
          <th>Credit</th>
          <th>Course Type</th>
          <th>Department</th>
          <th>Capacity</th>
          <th>Instructor</th>
          <th>Hours</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td><input type="text"   v-model="course.code"></td>
          <td><input type="text"   v-model="course.name"></td>
          <td><input type="text"   v-model="course.year"></td>
          <td><input type="text"   v-model="course.credit"></td>
          <td><input type="text"   v-model="course.type"></td>
          <td><input type="text"   v-model="course.inDepartment"></td>
          <td><input type="text"   v-model="course.capacity"></td>
          <td><input type="text"   v-model="course.instructor"></td>
          <td><input type="text"   v-model="course.hours"></td>

        </tr>
        </tbody>
      </table>
    </div>
    <div class="child" v-if="showServices && services.length> 0">
      <h2>Services</h2>
      <button class="button-container" style="margin:auto" @click="addService">Add Service</button><br>
      <table  class="table" v-if="showServices && services.length > 0">
        <thead>
        <tr>
          <th>Service Code</th>
          <th>Service Day</th>
          <th>Service Times</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="service in services" :key="service.id">
          <td><input type="text"   v-model="service.code" ></td>
          <td><input type="text"   v-model="service.day" ></td>
          <td><input type="text"   v-model="service.times" ></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="child" v-if="showClassrooms && classrooms.length > 0">
      
      <h2>Classrooms</h2>
      <button class="button-container" style="margin:auto" @click="addClassroom">Add Classroom</button><br>
      <table  class="table" v-if="showClassrooms && classrooms.length > 0">
        <thead>
        <tr>
          <th>Classroom Name</th>
          <th>Classroom Capacity</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="classroom in classrooms" :key="classroom.id">
          <td><input type="text"  v-model="classroom.name" ></td>
          <td><input type="text"  v-model="classroom.capacity" ></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="child" v-if="showBusyTimes && busyTimes.length > 0">
      <h2>Busy Times</h2>
      <button class="button-container" style="margin:auto" @click="addBusyTimes">Add Busy</button> <br>
      <table  class="table" v-if="showBusyTimes && busyTimes.length > 0">
        <thead>
        <tr>
          <th>Teacher Name</th>
          <th>Day</th>
          <th>Hours</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="busyTime in busyTimes" :key="busyTime.id">
          <td><input type="text"   v-model="busyTime.name" ></td>
          <td><input type="text"   v-model="busyTime.day" ></td>
          <td><input type="text"   v-model="busyTime.hours" ></td>

        </tr>
        </tbody>
        <tbody>
        <tr v-if="busyTimes.length>0">
          <input filesUploaded=true>
        </tr>
        </tbody>
      </table>
    </div>
    
  </div> <br>
  <div v-if="filesUploaded">
    <button class="button-container" @click="createEmptySchedule" style=" margin: 0 auto; "  v-if=" !scheduleCreated" >  Create Schedule  </button>

    <div v-if="scheduleCreated">
      <h1> Schedule </h1>

      <div>
      </div>
      <div v-for="(schedule, cls) in schedules[0]" :key="cls">
        <h2>{{ cls }}. year </h2>
        <table class="schedule-table">
          <thead>
          <tr>
            <th style= "background-color:  #8594e4;" > </th>
            <th v-for="day in days" :key="day" style="background-color: indigo; color:aliceblue;">{{ day }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(time, timeIndex) in times" :key="timeIndex" style="background-color: #ccb3ff;">
            <td style="background-color: rebeccapurple; color: aliceblue;" >{{ time }}</td>
            <td  v-for="(day, dayIndex) in days" :key="dayIndex">

              <input type="text" v-model="schedule[day][time]" class="input-color"  >
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <h2> UNPLACED COURSES </h2>
      <div>
        <tr class="unplaced-courses-container" v-for="(index) in schedules[1]" :key="index">
          <td></td>
          <td>
            {{ index.code }}
          </td>
        </tr>
      </div>
    </div>


  </div>

</template>


<script>
import HelloWorld from './components/HelloWorld.vue'
import {processFiles} from "@/main";
import {Schedular} from "@/Schedular";
import {Busy} from "@/Busy";
import {Course} from "@/Course";
import {Service} from "@/Service";
import {Classroom} from "@/Classroom";



export default {
  data(){
    return{
    selectedFiles: null,
        UNPLACED:[],
        classrooms: [],
        busyTimes: [],
        courses: [],
        services: [],
      showCourses:false,
      showBusyTimes:false,
      showServices:false,
      showClassrooms:false,
      showUnplaced:false,
      classes: [1, 2, 3, 4], // Örnek sınıflar
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], // Haftanın günleri
      times: ['8:30', '9:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30','16:30'], // Ders saatleri
      schedules: [], // Ders programları
      scheduleCreated: false, // Ders programı oluşturulduğunda true olacak
      filesUploaded: false, // Dosya yükleme durumunu takip eden özellik
    };
  },
  name: 'App',
  components: {
    HelloWorld,

  },
  methods: {
    createEmptySchedule() {
      //listeleri kapat v
      this.showCourses = false;
      this.showServices = false;
      this.showClassrooms = false;
      this.showBusyTimes = false;
      //listeleri kapat ^

      const schedular = new Schedular(this.classes, this.days,this.times);
      this.schedules = schedular.createEmptySchedule(this.classrooms,this.courses,this.services,this.busyTimes);
      this.scheduleCreated = true;
    },
    handleFileUpload(event) {
      this.selectedFiles = event.target.files;

    },addClassroom(){
      Classroom.add(this.classrooms, "CourseName", 0)
    },addBusyTimes(){
      Busy.add(this.busyTimes,"Instructor","BusyDay",["8:30"])
    },addService(){
      Service.add(this.services,"ServiceCode","ServiceDay",["8:30"])
    },addCourse(){
      Course.add(this.courses,"CourseCode","CourseName","Year","Credit","CourseType(E/C)","Department(S/D)","Capacity","Instructor",["8:30"])
    },
    uploadFiles() {
      if (!this.selectedFiles) {
        alert("Lütfen dosya seçin.");
        return;
      }
      processFiles(this.selectedFiles,this.classrooms,this.busyTimes,this.courses,this.services);
      this.filesUploaded = true;
    },
    placeF(){
      this.UNPLACED = Schedular.placer(this.classrooms,this.courses,this.services,this.busyTimes);

    },
    toggleView(view) {
      // Tüm görünümleri kapat
      this.showCourses = false;
      this.showBusyTimes = false;
      this.showServices = false;
      this.showClassrooms = false;

      // Yalnızca seçilen görünümü aç
      this[view] = true;
    },
  },
};

</script>




<style>


.app-image {
  background-image: url("https://i.pinimg.com/originals/19/95/75/199575d64001ea900620205f3d5861e5.jpg");
  background-size: cover ;
  background-position: center; 
  height:100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  margin-bottom: 0px;

}


.input-color .input-cell{
  background-color: inherit;
}

.logo-container {
  text-align: center;
  background-size: 100%;
}

.parent {
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.child {
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
}
input {
  border: none;
  width: 250px;
  height: 25px;
  text-align:center;
 

}
.schedule-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.schedule-table th, .schedule-table td {
  padding: 8px;
  border: 3px solid black;
}

.input-color{
  background-color:#ccb3ff ;
  width: fit-content;
}


.schedule-table td:hover {
  text-align: center;
  background-color:  #a696c8;
}

.schedule-table td:hover .input-color {
  background-color: inherit;
}
.table{
  background-color: #ccb3ff;
 
}
.button-container {
  display: flex; 
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #ccb3ff; 
  padding: 10px;
}

.button-container button {
  background-color: #8971d0; 
  color: white; 
  border: none; 
  padding: 20px 40px; 
  text-align: center; 
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px; 
  cursor: pointer;
  border-radius: 5px;
}

.button-container button:hover {
  background-color: indigo; 
}
.unplaced-courses-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 20px;
}


</style>