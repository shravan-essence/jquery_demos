import data from "./data.js"

let mydata
console.log(mydata);
if (localStorage.mydata) {
  alert("if....");
  var updatedData = JSON.parse(localStorage.getItem('mydata'))
  mydata = updatedData
}
else {
  alert(JSON.stringify(data));
  localStorage.setItem("mydata", JSON.stringify(data))
  mydata = JSON.parse(localStorage.getItem('mydata'))
}

$(document).ready(function(){
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

  //Add order 
  $("#addOrder").click(function (e) {
    var addid = $("#id").val()
    var addName = $("#name").val()
    var addLastname = $("#lastname").val()
    var addAge = $("#age").val()
    var addBdate = $("#bdate").val()
    var addDes = $("#des").val()
    console.log(addName);
    console.log(addLastname);
    console.log(addAge);
    console.log(addBdate);
    console.log(addDes);

    data.push({
      Id: addid,
      Name: addName,
      LastName: addLastname,
      Age: addAge,
      Birthdate: addBdate,
      Designation: addDes
    })
    localStorage.removeItem("mydata")
    localStorage.setItem("mydata", JSON.stringify(data));
    alert("New order created")
    e.preventDefault()
    location.reload(true)
  });

  //selection
  var select
  var selected_Id
  var items = new Array();
  $('#Mytable tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      select = false;
    }
    else {
      datatable.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
      items = []
    /*$($(this).find('td')).each(function () {
        alert(items.push($(this).html()));
      })*/
      selected_Id = $(this).find('.sorting_1').html()
      console.log(selected_Id)
      select = true;
    }
  });

 //Delete data
  $('#delbtn').click(function () {
    $("#deleteBtn").click(function () {
      datatable.row('.selected').remove().draw(false);
      // console.log("Deleted bruhhh")
      console.log(selected_Id)
      let after_delete = JSON.parse(localStorage.getItem('mydata')).filter(function (obj) {
        return obj.Id !== selected_Id;
      })
      // console.log(after_delete)
      localStorage.removeItem('mydata')
      localStorage.setItem("mydata", JSON.stringify(after_delete))
      window.location.reload(true)
    })
  });
});