import React, { useRef, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import { useRouter } from "next/router";
import { UploadIcon } from "../Icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComposeForm = () => {
  const formRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [emailError, setEmailError] = useState(false); 
  const [attachments, setAttachments] = useState([]);
  const [receiverName, setReceiverName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setReceiverName('');
    setSubject('');
    setBody('');
    setAttachments([]);
    setEmailError(false);
  };
  

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSendEmail = async (e) => {
    e.preventDefault();
  
    const firstName = e.target.receiverName.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const replyText = e.target.messageBody.value;
  
    if (!firstName || !email || !replyText || !validateEmail(email)) {
      setEmailError(true);
      return;
    }
  
    setEmailError(false);
    setIsSending(true);
  
  
    const data = {
      to: email,
      subject: subject,
      body: replyText,
      firstName: firstName,
      attachments: attachments.length > 0 ? attachments : undefined, 
    };
  
    try {
      const response = await axios.post('/api/sendEmail', data);
      if (response.status === 200) {
        toast.success('Email Send Successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          
          });
        closeModal();
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(' Error !!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      
        });
    }
  
    setIsSending(false);
  };

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(fileToBase64)).then((base64Files) => {
      const fileObjects = base64Files.map((base64String, index) => ({
        name: files[index].name,
        content: base64String,
        contentType: getContentType(files[index].type), // Determine contentType based on file type
      }));
      // Append new attachments to the existing ones
      setAttachments((prevAttachments) => [...prevAttachments, ...fileObjects]);
    });
  };
  
  
  
  const getContentType = (fileType) => {
    switch (fileType) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return 'image/jpeg'; // Set content type for images
      case 'application/pdf':
        return 'application/pdf'; // Set content type for PDFs
      case 'audio/mpeg':
        return 'audio/mpeg'; // Set content type for MP3s
      case 'video/mp4':
        return 'video/mp4'; // Set content type for MP4s
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'application/msword'; // Set content type for DOC and DOCX files
      default:
        return 'application/octet-stream'; // Default content type for other file types
    }
  };
  

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleReceiverNameChange = (e) => {
    setReceiverName(capitalizeFirstLetter(e.target.value));
  };

  const handleSubjectChange = (e) => {
    setSubject(capitalizeFirstLetter(e.target.value));
  };

  const handleBodyChange = (e) => {
    setBody(capitalizeFirstLetter(e.target.value));
  };

 
  return (
    <>  
      <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800">
        Compose Email
      </button>
      {modalOpen && (
        <form onSubmit={handleSendEmail} ref={formRef} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className=" bg-white p-8 rounded-lg w-3/5">
            <div className="flex justify-between">
            <h3 className="text-lg font-semibold mb-4">Compose Email</h3>
            <button onClick={closeModal} className=" bg-red-600 h-8 w-10 text-white font-bold  rounded-md hover:bg-red-800">X</button>
            </div>
            <div className="flex gap-12">
              <div className="flex flex-col">
                <label htmlFor="receiverName" className="block mb-2">Receiver's Name</label>
                <input type="text" id="receiverName" name="receiverName" placeholder="First or Full Name" className="w-72 mb-4 p-2 border rounded-lg"
                 value={receiverName}
        onChange={handleReceiverNameChange}
        required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="block mb-2">Receiver's Email Address</label>
                <input type="email" id="email" name="email" placeholder="Email Address" className={`w-72 mb-4 p-2 border rounded-lg ${emailError ? 'border-red-500' : ''}`} required />
                {emailError && <p className="text-red-500 text-sm">Please enter a valid email address.</p>}
              </div>
            </div>
            <label htmlFor="subject" className="block mb-2">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Subject" className="w-10/12 mb-4 p-2 border rounded-lg" 
             value={subject}  onChange={handleSubjectChange}/>
            <label htmlFor="messageBody" className="block mb-2">Message Body</label>
            <textarea id="messageBody" name="messageBody" placeholder="Write your message here..." rows="5" className="w-full h-56 mb-4 p-2 border rounded-lg" 
                value={body} onChange={handleBodyChange} required></textarea>
            <div className="flex gap-8 items-center mb-4">
              <label className="flex flex-col w-16 h-16 items-center cursor-pointer ">
                <UploadIcon className="h-8 w-8"/>
                <h1>
                Attachments:
                </h1>  
              <input type="file" name="attachments" multiple accept=".jpg,.jpeg,.png,.gif,.doc,.docx,.pdf,.mp3,.mp4" className="hidden"  onChange={handleAttachmentChange}  />
              </label>
              <div className="flex items-center gap-2">
  {attachments.map((file, index) => (
    <div key={index} className="flex items-center">
      {/* Render preview or file name based on file type */}
      {file.contentType.includes('image') ? (
        <img src={`data:${file.contentType};base64,${file.content}`} alt="Attachment" className="h-20 w-20" />
      ) : file.contentType.includes('pdf') ? (
        <embed src={`data:application/pdf;base64,${file.content}`} type="application/pdf" className="h-20 w-20" />
      ) : file.contentType.includes('docx') ? (
        <iframe src={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${file.content}`} className="h-16 w-16" />
      ) : file.contentType.includes('doc') ? (
        <iframe src={`data:application/msword;base64,${file.content}`} className="h-16 w-16" />
      ) : (
        <span className="mr-2">{file.name}</span> 
      )}
    </div>
  ))}
</div>

            </div>
            <div className="flex justify-end">
              {isSending ? (
                <div className="h-10 w-10 flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800" type="submit">Send</button>
                  <button onClick={closeModal} className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800">Cancel</button>
                </>
              )}
            </div>
          </div>
        </form>
        
      )}
     <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>
    </>
  );
}

export default ComposeForm;
