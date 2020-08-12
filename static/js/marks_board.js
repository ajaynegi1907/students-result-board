function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}   



function prep_result(){
    var mydata=[
        {
            "name":"rajiv",
            "marks":{
                "Maths":"18",
                "English":"21",
                "Science":"45"
            },
            "rollNumber":"KV2017-5A2"
        },
        {
            "name":"abhishek",
            "marks":{
                "Maths":"43",
                "English":"30",
                "Science":"37"
            },
            "rollNumber":"KV2017-5A1"
        },
        {
            "name":"zoya",
            "marks":{
                "Maths":"42",
                "English":"31",
                "Science":"50"
            },
            "rollNumber":"KV2017-5A3"
        }];
        mydata.sort(GetSortOrder("name"));
    jsondata((mydata));
    //fetch(url).then((resp)=>resp.json()).then(jsondata(data));
}

function jsondata(data){
    var col=["Student Name","Marks","Roll Number","Status"];
    var table=document.createElement("table");

    var tr=table.insertRow(-1);
    var th=document.createElement("th");
    th.colSpan="4";
    th.innerHTML="Students Result Board";
    tr.appendChild(th);

    var tr=table.insertRow(-1);
    for(var i=0;i<col.length;i++){
        var th=document.createElement("th");
        th.innerHTML=col[i];
        tr.appendChild(th);
    }
    
    var max=0;
    for(var i=0;i<data.length;i++){
        var status="Pass";
        tr=table.insertRow(-1);
        var sum=0,name;
        for(var j in data[i]){
            var tabCell=tr.insertCell(-1);
            if(j=="name"){
                name=data[i][j].charAt(0).toUpperCase()+data[i][j].slice(1);
                tabCell.innerHTML=name;
            }
            else if(j=="marks"){
                for(var k in data[i][j]){
                    sum+=Number(data[i][j][k]);
                    if(data[i][j][k]<20)
                        status="Fail";
                }
                if(sum>max){
                    max=sum;
                }
                tabCell.innerHTML=sum;
                
            }
            else{
                tabCell.innerHTML=data[i][j];
            }
        }
        var tabCell=tr.insertCell(-1);
        tabCell.innerHTML=status;
        //console.log(name+"  "+sum+"  "+status);
    }
    var row,r=1;
    while(row=table.rows[r++]){
        
        if(row.cells[1].innerHTML==max){
            row.cells[3].innerHTML="Topper";
        }
    }
    r=1;
    var temp;
    while(row=table.rows[r++]){
        temp=row.cells[1].innerHTML;
        row.cells[1].innerHTML=row.cells[2].innerHTML;
        row.cells[2].innerHTML=temp;
        if(row.cells[3].innerHTML=="Topper"){
            row.style.color="green";
        }
        if(row.cells[3].innerHTML=="Fail"){
            row.style.color="red";
        }

       // console.log(row.cells[1].innerHTML);
    }
    var pos=document.getElementById("res_table");
    pos.innerHTML="";
    pos.appendChild(table);

}






function validate(){
    
    var letters=/^[A-Za-z]+$/;
    var firstname=document.getElementById("firstname").value;
    var lastname=document.getElementById("lastname").value;
    var yop=document.getElementById("yop").value;
    var clas=document.getElementById("class").value;
    var percent=document.getElementById("percent").value;
    var invalid=[];
    console.log(firstname);
    if((firstname.trim()=="" ||!firstname.match(letters))){
        invalid.push("First Name is either empty or contains digits !!")
    }
    if((lastname.trim()=="" ||!lastname.match(letters))){
        invalid.push("Last Name is either empty or contains digits !!")
    }
    if(yop>2017 || !yop){
        invalid.push("Year of passing is either null or greater than 2017 !!")
    }
    if(clas.trim=="" || !percent){
        invalid.push("All fields not filled!!")
    }
    if(invalid.length !=0){
        alert(invalid.join("\n"));
        document.getElementById("submit_btn").style.background="red";
        return 0;
    }
    
    document.getElementById("submit_btn").style.background="blue";
    return 1;

}