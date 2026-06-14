function AddData() {
    var x = document.getElementById("cusID").value;
    var y = document.getElementById("cusName").value;
    var letters = '/^[a-zA-Z]+$/';
    if ((parseInt(x) != (x)) && (y == parseInt(y))) {
        alert("Wrong Value Entered");
    } else {
        var rows = "";
        var id = document.getElementById("cusID").value;
        var name = document.getElementById("cusName").value;
        var address= document.getElementById("cusAddress").value;
        var tp = document.getElementById("cusTP").value;

        rows += "<tr><td>" + id + "</td><td>" + name + "</td><td>" + address + "</td><td>" + tp + "</td></tr>";
        $(rows).appendTo("#cusTable tbody");
    }
}
function ResetForm(){
    document.getElementById("person").reset();
}
function AddItem() {
    var x = document.getElementById("itemCode").value;
    var y = document.getElementById("itemDesc").value;
    var letters = '/^[a-zA-Z]+$/';
    if ((x=='/^P/') && (y == parseInt(y))) {
        alert("Wrong Value Entered");
    } else {
        var rows = "";
        var id = document.getElementById("itemCode").value;
        var name = document.getElementById("itemDesc").value;
        var address= document.getElementById("itemUnit").value;
        var tp = document.getElementById("itemQuan").value;

        rows += "<tr><td>" + id + "</td><td>" + name + "</td><td>" + address + "</td><td>" + tp + "</td></tr>";
        $(rows).appendTo("#itemTable tbody");
    }
}