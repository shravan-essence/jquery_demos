import data from "./data.js"

let mydata
console.log(mydata);
if (localStorage.mydata) {
  var updatedData = JSON.parse(localStorage.getItem('mydata'))
  mydata = updatedData
}
else {
  alert(JSON.stringify(data));
  localStorage.setItem("mydata", JSON.stringify(data))
  mydata = JSON.parse(localStorage.getItem('mydata'))
}

$(document).ready(function(){
  $("#newbdate").datepicker({
    format: 'dd mmmm yyyy'
  });
  $("#bdate").datepicker({
    format: 'dd mmmm yyyy'
  });
  let cols = []
  console.log(data[0]);
  var keys = Object.keys(data[0]);

  keys.forEach(function (key) {
    cols.push({
      title: key,
      data: key
    });
  });

  let datatable = $("#Mytable").DataTable({
    columns: cols
  });

  datatable.rows.add(JSON.parse(localStorage.getItem("mydata"))).draw();

  //Add New Data
  $("#newDatabtn").click(function(){
    $("#newid").val("")
    $("#newname").val("")
    $("#newlastname").val("")
    $("#newage").val("")
    $("#newbdate").val("")
    $("#newdes").val("")
    $("#add_New_Data").click(function (e) {
      var addid = $("#newid").val()
      var addName = $("#newname").val()
      var addLastname = $("#newlastname").val()
      var addAge = $("#newage").val()
      var addBdate = $("#newbdate").val()
      var addDes = $("#newdes").val()
      console.log(addName);
      console.log(addLastname);
      console.log(addAge);
      console.log(addBdate);
      console.log(addDes);

      mydata.push({
        Id: addid,
        Name: addName,
        LastName: addLastname,
        Age: addAge,
        Birthdate: addBdate,
        Designation: addDes
      })
      localStorage.removeItem("mydata")
      localStorage.setItem("mydata", JSON.stringify(mydata));
      alert("New order created")
      e.preventDefault()
      location.reload()
    });
  });
  //selection of row
  var select
  var selected_Id
  hideButtons()
  var items = new Array();
  $('#Mytable tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      select = false;
      hideButtons()
    }
    else {
      datatable.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
      showButtons()
      items = []
      $($(this).find('td')).each(function () {
        items.push($(this).html());
      })
      //alert(items)
      selected_Id = $(this).find('.sorting_1').html()
      console.log(selected_Id)
      select = true;
    }
  });
  function showButtons() {
    $('#delete_Data_btn').attr('disabled', false)
    $('#edit_Data_btn').attr('disabled', false)
  }
  function hideButtons() {
    $('#delete_Data_btn').attr('disabled', true)
    $('#edit_Data_btn').attr('disabled', true)
  }
 //Delete selected data
  $('#delete_Data_btn').click(function () {
    $("#delete_Data").click(function () {
      datatable.row('.selected').remove().draw(false);
      console.log(selected_Id)
      let after_delete = JSON.parse(localStorage.getItem('mydata')).filter(function (obj) {
        return obj.Id !== selected_Id;
      })
      localStorage.removeItem('mydata')
      localStorage.setItem("mydata", JSON.stringify(afters_delete))
      window.location.reload()
    })
  });

  //Edit selected Data
  $("#edit_Data_btn").click(function () {
    $("#editDataModal #id").val(items[0])
    $("#editDataModal #name").val(items[1])
    $("#editDataModal #lastname").val(items[2])
    $("#editDataModal #age").val(items[3])
    $("#editDataModal #bdate").val(items[4])
    $("#editDataModal #des").val(items[5])
    //alert(items)
  });

  $("#update_Data").click(function(){
    if(window.confirm("Are you sure?")){
      //storing updated values to the variables
      let updatedId = $("#editDataModal #id").val()
      let updatedName = $("#editDataModal #name").val()
      let updatedLastName = $("#editDataModal #lastname").val()
      let updatedAge = $("#editDataModal #age").val()
      let updatedBirthdate =  $("#editDataModal #bdate").val()
      let updatedDesignation = $("#editDataModal #des").val()
      alert(datatable.row().Id);
      //stroing data into new var without selected row and deleting old stored data 
      datatable.row('.selected').remove().draw(false);
      //alert(selected_Id)
      let after_delete = JSON.parse(localStorage.getItem('mydata')).filter(function (obj) {
        return obj.Id !== selected_Id;
      })
      localStorage.removeItem('mydata')
      localStorage.setItem("mydata", JSON.stringify(after_delete))

      var updatedData = JSON.parse(localStorage.getItem("mydata"))
      updatedData.push({
        Id: updatedId,
        Name: updatedName,
        LastName: updatedLastName,
        Age: updatedAge,
        Birthdate: updatedBirthdate,
        Designation: updatedDesignation
      })
      localStorage.removeItem('mydata')
      localStorage.setItem("mydata", JSON.stringify(updatedData))
      window.location.reload()
    }
  });
});