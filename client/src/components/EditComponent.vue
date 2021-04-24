<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <!-- update content -->
      <h1>Edit Content</h1>
      <form @submit.prevent="handleUpdateForm" enctype="multipart/form-data">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="student.name"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            v-model="student.email"
            required
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input
            type="text"
            class="form-control"
            id="phone"
            v-model="student.phone"
            required
          />
        </div>
        <div class="form-group">
                    <label for="file">Upload Image</label>
                    <input type="file" ref="file" name="file" id="file" class="form-control-file" v-on:change="selectfile">
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      student: {},
      file:""
    };
  },
  created() {
    let apiURL = `http://localhost:4000/api/edit-student/${this.$route.params.id}`;
    axios.get(apiURL).then((res) => {
      this.student = res.data;
    });
  },
  methods: {
    selectfile(){
            this.file = this.$refs.file.files[0];
            console.log(this.file);
        },
    async handleUpdateForm() {

      let apiUpload = 'http://localhost:4000/api/upload';
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      

      try{
          await axios.post(apiUpload, formData);
          this.file = "";
          console.log(this.$refs.file.files[0].name)
          this.student.img = this.$refs.file.files[0].name;
          // this.$router.push('/view');
          
      } catch(err){
          console.log(err);
      }


      let apiURL = `http://localhost:4000/api/update-student/${this.$route.params.id}`;

      await axios
        .put(apiURL, this.student)
        .then((res) => {
          console.log(res);
          // this.$router.push('/view')
        }).then(()=>{
          this.$router.push('/view');
        })
        .catch((error) => {
          console.log(error);
        });
        
    },
  },
};
</script>