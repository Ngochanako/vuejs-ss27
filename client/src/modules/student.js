import { getStudents } from "@/api/students"

export const student={
    state:{
        students:[]
    },
    mutations:{
        GET_STUDENTS(state,payload){           
            state.students=payload        
        }
    },
    actions:{
        async getStudents({ commit }) {
            const response = await getStudents(); // Gọi API lấy dữ liệu
            commit('GET_STUDENTS', response);     // Commit mutation để cập nhật state
          }
    }
}