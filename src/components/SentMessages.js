import { useRef } from "react"
import {MdSend} from "react-icons/md"
import { auth,db} from '../data/firebase'
import {addDoc,serverTimestamp, collection} from "firebase/firestore";
 
const SentMessages = (props) => {

  const message = useRef("")

  //handle sent message to firebase
  const handleSent =async ()=>{
        if (message.current.value === '') {
            alert('Please enter a valid message')
            return
        }
        const {uid, displayName} = auth.currentUser
        await addDoc(collection(db, 'messages'), {
            text: message.current.value,
            name: displayName,
            photo: props.user.photoURL,
            uid,
            timestamp: serverTimestamp()
        }).then(()=> {
        message.current.value = ""
        props.scrollToEnd.current.scrollIntoView({behavior: 'smooth'})
      })
  }

  return (
    <div className="w-[100] h-[55px]">
    <hr className="h-[2px] my-1 w-[100%] bg-slate-300"/>
    <div className="w-[100%] flex justify-around px-5">
      <input
        className="w-[70%] border-b-2
         outline-none"
        ref = {message}
        type='text'
        placeholder='Message'
      />
        <MdSend className="text-[2em] text-blue-400" onClick={()=>handleSent()} />
    </div>
    </div>
  )

}

export default SentMessages