<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p><c>
      You need to upload files in correct form to create a schedule! </c><br><br>
      Page of Faculty :
      <a href="https://aybu.edu.tr/BilgisayarMuh/custom_page-390-ankara-yildirim-beyazit-universitesi-yonetmelikleri.html" target="_blank" rel="noopener">Click Here</a>.
    </p>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
c{
  color: darkred;
}
</style>
