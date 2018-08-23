<template>
  <div class="card">
    <h5 class="card-header">Scores</h5>
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anonymous</td>
            <td>100</td>
          </tr>
          <tr>
            <td>Anonymous 2</td>
            <td>90</td>
          </tr>
          <tr>
            <td>Anonymous 3</td>
            <td>80</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
      <h5>Winner: {{'Anonymous'}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'table-score'
}
</script>

<style>

</style>
