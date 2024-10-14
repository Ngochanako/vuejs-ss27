
<template>
    <v-container grid-list-xs>
       <v-row style="justify-content: space-between; margin-top: 20px;">
         <div style="font-weight: 600;font-size: 28px;">Nhân viên</div>
         <v-btn @click="openModalAdd" color="info">Thêm mới nhân viên</v-btn>
       </v-row>
       <v-row style="justify-content: flex-end;margin-top: 30px;">
         <v-text-field
           name="name"
           label="Tìm kiếm theo email"
           id="id"
           variant="solo"
           max-width="344"
           density="compact"
           append-icon="mdi-magnify"
         ></v-text-field>
       </v-row>
       <v-table>
           <thead>
               <tr>
                 <th>STT</th>
                 <th>Họ và tên</th>
                 <th>Ngày sinh</th>
                 <th>Email</th>
                 <th>Địa chỉ</th>
                 <th>Trạng thái</th>
                 <th>Chức năng</th>
               </tr>
           </thead>
           <tbody>
             <tr v-for="(btn,index) in students" :key="btn.id">
               <td>{{ index+1 }}</td>
               <td>{{ btn.name }}</td>
               <td>{{ btn.dateOfBirth}}</td>
               <td>{{ btn.email }}</td>
               <td>{{ btn.address }}</td>
               <td v-if="btn.status"><v-chip color="secondary">Đang hoạt động</v-chip></td>
               <td v-else><v-chip color="red">Không hoạt động</v-chip></td>
               <td>
                 <v-row>
                     <v-col cols="6">
                       <v-btn color="primary" @click="editStudent(btn)">Sửa</v-btn>
                     </v-col>
                     <v-col cols="6">
                       <v-btn color="error" @click="deleteStudent(btn.id)">Xóa</v-btn>
                     </v-col>
                 </v-row>
               </td>
             </tr>
           </tbody>
       </v-table>
    </v-container>
 </template>
 
 <script setup>
 import { computed, onMounted, reactive } from 'vue'
 import { useStore } from 'vuex'
 //Initialize
 const store=useStore();
 // Fetch students when the component is mounted
 onMounted(() => {
   store.dispatch('getStudents');
 });
 //access students from vuex store
 const students=computed(()=>store.state.student.students)
 
 </script>
 
 <style>
 
 </style>