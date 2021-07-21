<template>
  <div id="app">
    <b-container>
      <h2>Список препаратов:</h2>
        <b-form>
          <b-row>
            <b-col>
              <b-input-group class="w-100" prepend="Название">
                <b-form-input></b-form-input>
              </b-input-group>
            </b-col>
            <b-col cols="3">
              <b-button type="submit" variant="success">Найти в аптечке</b-button>
              <b-button type="submit" variant="success">Добавить в список</b-button>
            </b-col>
          </b-row>
        </b-form>
        <b-button type="submit" variant="success" @click="onShow">Показать</b-button>
      <b-overlay :show="isLoading" class="w-100 h-100">
          <b-table :fields="fields" :items="itemsList">
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
      /**Столбцы таблицы */
      fields:[
        { key: "name", label: "Название" },
        { key: "amount", label: "Количество" },
        { key: "storage", label: "Место хранения" },
        { key: "year", label: "Срок годности" },
      ],
      /**Список TODO */
      itemsList: [
      ]
    }
  },
  methods:{
      async onShow(){
          try{
              const response = await axios.get('http://127.0.0.1:8888/api/')
              this.itemsList = response.data
          }
          catch (error) {
             console.log(error)
          }
      }
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
    margin-top: 2.5vh !important;
    padding-right: 0 !important;
  }
  .col-3{
    width: 20% !important;
  }
  button{
    width: 100%;
    margin-bottom: 1vh !important;
  }
  .input-group-text,.form-control {
    border: 1px solid #198754 !important;
  }
  th,tr{
    text-align: center !important;
  }
  tr td:first-child{
    text-align: left !important;
  }
  table input{
    width: 45px;
  }

</style>
