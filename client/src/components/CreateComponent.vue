<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- contents go here -->
            <h1>Create Content</h1>
            <form @submit.prevent="handleSubmitForm" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" v-model="student.name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" id="email" v-model="student.email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="number" class="form-control" id="phone" v-model="student.phone" required>
                </div>
                <div class="form-group">
                    <label for="file">Upload Image</label>
                    <input type="file" ref="file" name="file" id="file" class="form-control-file" v-on:change="selectfile">
                </div>

                <div class="form-group">
                    <button class="btn btn-success btn-block">Create</button>
                </div>
            </form>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            student:{
                name: '',
                emai: '',
                phone: '',
                img: ''
            },
            file:""
            

        }
    },
    methods:{
        selectfile(){
            this.file = this.$refs.file.files[0];
            console.log(this.file);
        },
        async handleSubmitForm(){

            let apiUpload = 'http://localhost:4000/api/upload';
            const formData = new FormData();
            formData.append('file', this.file, this.file.name);
            

            
            await axios.post(apiUpload, formData).then(() =>{ this.file = "";
                console.log(this.$refs.file.files[0].name)
                this.student.img = this.$refs.file.files[0].name;
                
                })
                .then(()=>{
                this.$router.push('/view');
                })
                .catch(error => {
                console.log(error)
            });


            let apiURL = 'http://localhost:4000/api/create-student';
            axios.post(apiURL, this.student).then(() =>{
                console.log(this.student);
                
                this.student = {
                    name: '',
                    email: '',
                    phone: '',
                    img: ''
                };
                
            }).then(()=>{
            this.$router.push('/view');
            }).catch(error => {
                console.log(error)
            });

            
        }
    }
}
</script>