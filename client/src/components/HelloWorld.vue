<template>
  <div>
    <form @submit.prevent="addMessage">
      <div v-if="error">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4>Error!</h4>
        <p>{{error}}</p>
      </div>
      <div>
        <label for="username">Username</label>
        <input
            type="text"
            v-model="message.username"
            id="username" required/>
      </div>
      <div>
        <label for="subject">Subject</label>
        <input
            v-model="message.subject"
            type="text"
            class="form-control"
            id="subject"
            placeholder="Enter a subject" required/>
      </div>
      <div>
        <label for="message">Message</label>
        <textarea
            v-model="message.message"
            id="message"
            rows="3">
        </textarea>
      </div>
      <div>
        <label for="imageURL">Image URL</label>
        <input
            v-model="message.imageURL"
            type="url"
            id="imageURL"
            placeholder="Enter URL to an image"
        />
      </div>
      <button type="submit">Add Message</button>
    </form>
    <hr/>
    <div class="list-unstyled" v-for="message in messages" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject">
        <div class="media-body">
          <h4>{{ message.username }}</h4>
          <h5>{{ message.subject }}</h5>
          {{ message.message }}
          <br/>
          <small>{{ message.create }}</small>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
 const API_URL = "http://localhost:4000/messages";

 export default {
     name: 'HelloWorld',
     data: () => ({
         error: "",
         messages: [],
         message:{
             username: "Enter a screen name",
             subject: "",
             message: "",
             imageURL: ""
         }
     }),
     mounted(){
         fetch(API_URL)
             .then(response => response.json())
             .then(results =>{
                 this.messages = results;
             });
     },
     props: {
         msg: String
     },
     computed:{
         reversedMessages(){
             return this.messages.slice().reverse();
         }
     },
     methods:{
         addMessage(){
             console.log(this.message);
             fetch(API_URL, {
                 method: "POST",
                 body: JSON.stringify(this.message),
                 headers: {
                     "content-type": "application/json"
                 }
             })
                 .then(response => response.json())
                 .then(result => {
                     if(result.details){
                         const error = result.details
                                             .map(detail => detail.message)
                                             .join(". ");
                         this.error = error;
                     }else{
                         this.error = "";
                         this.showMessageForm = false;
                         this.messages.push(result);
                     }
                 })
         }
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 img {
     max-width: 300px;
     height: auto;
 }
</style>
