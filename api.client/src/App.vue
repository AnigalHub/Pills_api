<template>
  <div id="app">
    <b-container>
      <h2>Список препаратов:</h2>
        <b-form class="w-100" @submit.prevent="onAddTODO">
        <b-row>
            <b-col id="input_all">
                <b-input-group class="w-100" prepend="Название" ><b-form-input v-model="newItem.name"></b-form-input></b-input-group>
                <b-row>
                    <b-col>
                        <b-input-group class="w-100" prepend="Номер" ><b-form-input v-model="newItem.id"></b-form-input></b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group class="w-100" prepend="Количество"><b-form-input v-model="newItem.number"></b-form-input></b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group class="w-100" prepend="Срок годности"><b-form-input v-model="newItem.year"></b-form-input></b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-input-group class="w-100" prepend="Место хранения"><b-form-input v-model="newItem.storage"></b-form-input></b-input-group>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="3">
             <!-- <b-button type="submit" variant="success" @click="onShow">Найти в аптечке</b-button> -->
              <b-button type="submit" variant="success" >Добавить в список</b-button>
            </b-col>
        </b-row>
        </b-form>
       <b-button type="submit" variant="success" @click="onShow2">Показать</b-button>
       <b-overlay :show="isLoading" class="w-100 h-100">
          <b-table :fields="fields" :items="itemsList">
              <template #cell(id)='{item}'>
                  <div>{{item.id}}</div>
              </template>
               <template #cell(name)='{item}'>
                  <div>{{item.name}}</div>
               </template>
               <template #cell(amount)='{item}'>
                  <input :placeholder=item.number>
               </template>
               <template #cell(storage)='{item}'>
                  <div>{{item.storage}}</div>
               </template>
               <template #cell(year)='{item}'>
                  <input :placeholder=item.year>
               </template>
               <template #cell(change)>
                   <b-button type="submit" variant="success">Изменить</b-button>
               </template>
          </b-table>
      </b-overlay>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {},
  data(){
    return{
      isLoading: false,
      newItem:{
         name: "",
         number: "",
         storage:"",
         year:"",
         id:"",
      },
      /**Столбцы таблицы */
      fields:[
        { key: "id", label: "Номер" },
        { key: "name", label: "Название" },
        { key: "amount", label: "Количество" },
        { key: "storage", label: "Место хранения" },
        { key: "year", label: "Срок годности" },
        { key: "change", label: "Изменить" },
      ],
      /**Список TODO */
      itemsList: [],
    }
  },
  methods:{
      async onShow(){
          try{
              const response = await axios.get('http://127.0.0.1:8889/api/')
              this.itemsList = response.data
          }
          catch (error) {
             console.log(error)
          }
      },
      async onShow2(){
          try{
              const response = await axios.get('http://127.0.0.1:8889/api/gg')
              this.itemsList = response.data
          }
          catch (error) {
              console.log(error)
          }
      },
      async onAddTODO(){
          try{
              if(!this.newItem.name)
                  return
              await this.onAdd()
              await this.onShow()
          }
          catch(error) {
              console.log(error)
          }
      },
      async onAdd(){
          await axios.post('http://127.0.0.1:8889/api/add', {
                                                                    name: this.newItem.name,
                                                                    id: this.newItem.id,
                                                                    number: this.newItem.number,
                                                                    storage:this.newItem.storage,
                                                                    year:this.newItem.year
          })
          this.newItem.name = ""
      },
  }
}
</script>

<style>
  body{
    margin: 0 !important;
    padding: 0 !important;
  }
  #app {
    min-height: 100vh;
    margin: 0 !important;
    padding: 4vh !important;
    background: honeydew;
  }
  h2{
    text-align: center;
    font-family: 'STIX Two Math', serif;
    margin-bottom: 4vh !important;
  }
  .container{
    background: #fff;
    min-height: 95vh;
    max-width: 55% !important;
    padding: 2vh;
    box-shadow: 1px 1px 5px;
    border-radius: 1px;
  }
  .col{

  }
  .col-3{
    width: 20% !important;
  }
  #input_all{
      padding: 0 5px 0 15px  !important;
  }
  button{
    width: 100%;
    margin-bottom: 1vh !important;
  }
  .input-group-text,.form-control {
    border: 1px solid #198754 !important;
    margin-bottom: 10px;
  }
  th,tr{
    text-align: center !important;
  }
  tr td:first-child{
    text-align: left !important;
  }
  table input{
    width: 45px;
    margin-bottom: 0;
  }

</style>
