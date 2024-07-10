import axios from "axios";

const API_URL = 'http://localhost:8000';

const showLink = ({path: url})=>{
  
  console.log(`url is:${url}`);

  document.querySelector("#fileURL").value=url;

   document.querySelector("#link").value = url;
  
   document.querySelector('.progress-container').style.display="none";
 
   document.querySelector(".sharing-container").style.display="block";

   document.querySelector("#emailForm").addEventListener("submit", (e)=>{

    e.preventDefault();

    console.log("submit form");

    document.querySelector(".sharing-container").style.display= "none";

    showToast("Email Sent");

  });
  
}



 const options = {

  onUploadProgress: (progressEvent)=>{

    const {loaded, total} = progressEvent;

    let percent = Math.floor((loaded *100)/ total);

    console.log(`${loaded}kb of ${total}kb | ${percent}%`);

    document.querySelector(".bg-progress").style.width = `${percent}%`;

    document.querySelector("#percent").innerText = `${percent}%`;

    document.querySelector('.progress-bar').style.transform=`scaleX(${percent/100})`;
 
  }

}

let toastTimer;

const showToast = (msg) =>{

    document.querySelector(".toast").innerText=msg;

    document.querySelector(".toast").style.transform = "translate(-50%, 0)";

    clearTimeout(toastTimer);

    toastTimer = setTimeout(()=>{

    document.querySelector(".toast").style.transform = "translate(-50%, 60px)";

    },2000);

};


 export const uploadFile = async (data) => {

    document.querySelector('.progress-container').style.display="block";

    try{

      let response = await  axios.post(`${API_URL}/upload`,data,options);

      const str = response.data.path;

      console.log("The response is",response);
   
      console.log(str.split("/").splice(-1,1));

      showLink(response.data);
      
     }catch(error){

        console.error("error while calling the api:", error.message);

    }

  }


