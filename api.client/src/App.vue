<template>
  <div id="app">
    <b-container>
      <h2>Список препаратов:</h2>
        <h5>Добавление</h5>
        <hr>
        <b-form class="w-100" id="input_all">
            <b-row>
                <b-input-group class="w-100" prepend="Название" ><b-form-input v-model="newItem.name"></b-form-input></b-input-group>
                <b-col>
                    <b-row>
                        <b-col cols="4">
                            <b-input-group class="w-100" prepend="Количество"><b-form-input v-model="newItem.number"></b-form-input></b-input-group>
                        </b-col>
                        <b-col>
                            <b-input-group class="w-100" prepend="Срок годности"><b-form-input v-model="newItem.year"></b-form-input></b-input-group>
                        </b-col>
                        <b-col>
                            <b-input-group class="w-100" prepend="Место хранения"><b-form-input v-model="newItem.storage"></b-form-input></b-input-group>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="3">
                    <b-button variant="success" @click="onAddTODO">Добавить в список</b-button>
                </b-col>
            </b-row>
            <h5>Поиск</h5>
            <hr>
        </b-form>
        <b-form class="w-100">
            <b-row>
                <b-col>
                    <b-row>
                        <b-col>
                            <b-input-group class="w-100" prepend="Название" ><b-form-input v-model="FilterItem.name"></b-form-input></b-input-group>
                        </b-col>
                        <b-col>
                            <b-input-group class="w-100" prepend="Место хранения"><b-form-input v-model="FilterItem.storage"></b-form-input></b-input-group>
                        </b-col>
                        <b-col>
                            <b-input-group class="w-100" prepend="Срок годности"><b-form-input v-model="FilterItem.year"></b-form-input></b-input-group>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="3">
                    <b-button variant="success" @click="onSearch">Найти в аптечке</b-button>
                </b-col>
            </b-row>
        </b-form>
       <b-overlay :show="isLoading" class="w-100 h-100">
          <b-table :fields="fields" :items="itemsList">
               <template #cell(name)='{item}'>
                   <input v-model="item.name" >
               </template>
               <template #cell(amount)='{item}'>
                  <input v-model="item.number">
               </template>
               <template #cell(storage)='{item}'>
                   <input v-model="item.storage">
               </template>
               <template #cell(year)='{item}'>
                  <input  v-model="item.year">
               </template>
               <template #cell(change)='{item}'>
                   <b-button type="submit" variant="outline-success" @click="onUpdateTodo(item,item.id)">✓</b-button>
                   <b-button type="submit" variant="outline-danger" @click="onDeleteTodo(item.id)">X</b-button>
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
      },
      FilterItem:{
          name: "",
          storage:"",
          year:"",
      },
      /**Столбцы таблицы */
      fields:[
        { key: "name", label: "Название" },
        { key: "amount", label: "Количество" },
        { key: "storage", label: "Место хранения" },
        { key: "year", label: "Срок годности" },
        { key: "change", label: "Изменить | Удалить" },
      ],
      /**Список TODO */
      itemsList: [],
    }
  },
  methods:{
      async onAddTODO(){
          try{
              await this.onAdd()
              await this.onSearch()
          }
          catch(error) {
              console.log(error)
          }
      },
      async onAdd(){
          await axios.post('http://127.0.0.1:8889/api/add', {name: this.newItem.name, number: this.newItem.number, storage:this.newItem.storage, year:this.newItem.year})
          this.newItem.name = ""
      },
      async onDeleteTodo(id){
          try{
              await this.onDelete(id)
              await this.onSearch()
          } catch(error){
              this.logError(error)
          }
      },
      async onDelete(id){
          await axios.post('http://127.0.0.1:8889/api/delete',{id})
      },
      async onUpdateTodo(changes,id){
          try{
              await this.onUpdate(changes,id)
              await this.onSearch()
          }
          catch(error){
              this.logError(error)
          }
      },
      async onUpdate(changes,id){
          await axios.post('http://127.0.0.1:8889/api/update',{name: changes.name,number:changes.number,storage:changes.storage,year:changes.year,id})
      },
      async onSearch(){
          try{
              this.isLoading = true
              const response = await axios.post('http://127.0.0.1:8889/api/',{name: this.FilterItem.name,storage:this.FilterItem.storage,year:this.FilterItem.year})
              this.itemsList = response.data
          }
          catch (error) {
              console.log(error)
          }
          finally{
              this.isLoading = false
          }
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
      text-align: center; font-family: 'STIX Two Math', serif;
      margin-bottom: 4vh !important;
  }
  h5{font-weight: bold;}
  .container{
    background: #fff;
    min-height: 95vh;
    max-width: 55% !important;
    padding: 2vh;
    box-shadow: 1px 1px 5px;
    border-radius: 1px;
  }
  .col-3{width: 20% !important;}
  #input_all{padding: 0 15px 0 0  !important;}
  #input_all .col .col,#input_all .col-4{padding-right: 0 !important;}
  button{
    width: 100%;
    margin-bottom: 1vh !important;
  }

  table button{
      width: 42%;
      margin-right: 8%;
      margin-bottom: 0 !important;
  }
  .input-group-text,.form-control {
    border: 1px solid #198754 !important;
    margin-bottom: 10px;
    padding: 0.375rem 0.25rem !important;
  }
  th,tr{text-align: center !important;}
  tr td:first-child{text-align: left !important;}
  table input{
      width: 45px;
      margin-bottom: 0;
      border: none !important;
  }
  table input:focus{
      outline: 1px solid;

  }
    table tr td:first-child input{
        width: 105%;
    }
  table tr td:nth-child(3) input{
      width: 110%;
  }
  table tr td:first-child{
      width: 40%;
  }

  table input:focus::-webkit-input-placeholder {
      color: transparent;
  }



</style>
