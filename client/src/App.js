import mySvg from './file.svg';
import {useRef, useState, useEffect} from "react";
import './App.css';
import { uploadFile } from './services/api';
import img from './assets/newImg.png';


function App() {

  const [file, setFile] = useState('');
  const fileInputRef = useRef();

  const[email, setEmail] = useState("");
  const[link2,setLink] = useState("");
  
  const sendEmail = async(a)=>{

     await fetch("/register", {
      method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email, link2
          })
       })
    }


  useEffect(()=>{

    const getImage = async()=>{

      if(file){
         const data = new FormData();
         data.append("name",file.name);
         data.append("file",file);

        await uploadFile(data);
      }
    }
    getImage();
  },[file])
  
  const onUploadClick = () =>{
     fileInputRef.current.click();
}

   console.log(file);

  return (
    
   <div className="container">
        
        <div className="upload-container">
        <div className="drop-zone ">
        <div className="icon-container">
          <img src={mySvg}  className="center" />
        </div>
        
        <p>Browse or upload your files</p>
        <button onClick={onUploadClick} className='upload'>Upload</button>
        <input type="file" 
           ref = {fileInputRef}
           style={{display:'none'}}
           onChange={(e)=>{
           setFile(e.target.files[0])
           }}
        />

        </div>

        <div className='progress-container'>
           <div className='bg-progress'></div>
           <div className='inner-container'>
              <div className='title'>Uploading...</div>
              <div className='percent-container'><span id="percent">0 %</span></div>
              <div className='progress-bar'></div>
           </div>
         
        </div>
        
        <div className='sharing-container'>
          <p className='expire'>Link Expires in 24 hrs</p>
          <div className='input-container'>
             <input type="text" id="fileURL" readOnly />
              <img src={img} alt="copyImg" />
          </div>

          {/* Email Form */}
              
            <p> Or Send Via Email</p>
          <div className='email-container'>

          <form id="emailForm" >

            <div className='filed link1'>
              <label htmlFor="link">Link</label>
              <input type="text"  name="link" id="link" onClick={(e)=>setLink(e.target.value)}/>
            </div>


             <div className='filed'>
              <label htmlFor="sender">Your Email</label>
              <input type="email" required  name="from-email" id="sender" />
             </div>

             <div className='filed'>
              <label htmlFor="receiver">Receiver's Email</label>
              <input type="email" required  name="to-email" id="reciever" onChange={(a)=>setEmail(a.target.value)}/>
             </div>

             <button type="submit" name="submit" onClick={sendEmail}>Send</button>
          </form>
        </div>
        </div>

        </div>
        <div className="upload-vector"></div>
        <div className="toast">xxyz</div>
      </div>

  );
 }

export default App;




