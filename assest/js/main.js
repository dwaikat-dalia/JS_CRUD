    
var courseName = document.getElementById("courseName");
var courseCat = document.getElementById("courseCat");
var coursePrice = document.getElementById("coursePrice");
var courseDesc = document.getElementById("courseDesc");
var addBtn = document.getElementById("addBtn");
var data = document.getElementById("data");
var clear = document.getElementById("clear");
var nameAlert = document.getElementById("nameAlert")
var courses;
var currentIndex ;//global


if(localStorage.getItem("coursesList")== null ){
    courses = [];
}
else{
    var courses = JSON.parse(localStorage.getItem("coursesList"));//convert from string to array
    console.log(courses);
    DisplayData();
}


addBtn.onclick= function(){
    if(addBtn.innerHTML == "Add Course"){
        addCourse();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'course added successfully',
            showConfirmButton: false,
            timer: 1500
          })
    }else{
        update();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'course updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
        addBtn.innerHTML="Add Course";
    }
    
    DisplayData();
    
    localStorage.setItem("coursesList",JSON.stringify(courses));
    
    clear();
}

deleteAll.onclick=function(){

localStorage.removeItem("coursesList");
courses= [] ;
data.innerHTML="";

}


clear.onclick=function(){
    courseName.value = " ";
    courseCat.value = " ";
    coursePrice.value = " ";
    courseDesc.value= " ";

    
}
function addCourse(){
    var course = {
        name:courseName.value , 
        catg : courseCat.value ,
        price :coursePrice.value ,
        desc :  courseDesc.value

    };
    courses.push(course);
    
}
function DisplayData(){

    var result = " " ;

    for(var i = 0;i < courses.length ;i++){
        result += `
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].catg}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].desc}</td>
        <td> <button  type="button" onclick="getCourseData(${i})" id="update" class="btn btn-outline-info">Update</button>
        <button  type="button" onclick="Delete(${i})" id="delete" class="btn btn-outline-danger">Delete</button></td>
        </tr>
        
        ` ;
    }
    data.innerHTML = result ;
   
}
function clear (){


    courseName.value = " ";
    courseCat.value = " ";
    coursePrice.value = " ";
    courseDesc.value= " ";

}
function Delete( id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(id,1);
            localStorage.setItem("coursesList",JSON.stringify(courses));
            DisplayData();
          Swal.fire(
          
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
   
}

function getCourseData(index){
    var course = courses[index];
    courseName.value = course.name ;
    courseCat.value = course.catg ;
    coursePrice.value = course.price ;
    courseDesc.value = course.courseDesc ;
    addBtn.innerHTML = "Update course" ;
    currentIndex = index;
 
}
function update(){
    var course = {
        name:courseName.value , 
        catg : courseCat.value ,
        price :coursePrice.value ,
        desc :  courseDesc.value

    };

    courses[currentIndex].name = course.name ;
    courses[currentIndex].catg = course.catg ;
    courses[currentIndex].price = course.price ;
    courses[currentIndex].desc = course.desc ;
    
    localStorage.setItem("coursesList",JSON.stringify(courses));

}

function search(e){

    var result = " " ;

    for(var i = 0;i < courses.length ;i++){
        if(courses[i].name.toLowerCase().includes(e.value.toLowerCase())){
            result += `
            <tr>
            <td>${i+1}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].catg}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].desc}</td>
            <td> <button  type="button"  onclick="getCourseData(${i})" id="update" class="btn btn-outline-info">Update</button>
            <button  type="button" onclick="Delete(${i})" id="delete" class="btn btn-outline-danger">Delete</button></td>
            </tr>
            
            ` ;
        }
       
    }
    data.innerHTML = result ;
   

}

courseName.onkeyup= function(){

    var pattern = /^[A-Z][a-z]{2,15}$/;
   if(pattern.test(courseName.value)){
    addBtn.removeAttribute("disabled");

    courseName.classList.add("is-valid");
    courseName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none") ;

   }else{
    addBtn.setAttribute("disabled","disabled");
    courseName.classList.replace("is-valid", "is-invalid");
    nameAlert.classList.add("d-block") ;
    nameAlert.classList.remove("d-none") ;
   }


}


