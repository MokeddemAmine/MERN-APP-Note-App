import React, { useEffect, useState } from 'react'
import Navbar from '../../compoents/Navbar/Navbar'
import NoteCard from '../../compoents/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../compoents/ToastMessage/Toast'
import EmptyCard from '../../compoents/EmptyCard/EmptyCard'
import addNotesImg from '../../assets/images/add-notes.webp';
import noDataImg from '../../assets/images/no-data.png';

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown:false,
    type:"add",
    data:null,
  });
  const [showToastMsg, setShowToastMsg] = useState({
    isShown:false,
    message:'',
    type:'add',
  });
  const showToastMessage = (message,type) => {
    setShowToastMsg({
      isShown:true,
      message,
      type,
    });
  };
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown:false,
      message:''
    });
  };

  const [allNotes,setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({isShown:true, data: noteDetails, type:'edit'});
  }
  // Get User Info
  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get('/auth/user');
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    }catch(err){
      if(error.response.status == 401){
        localStorage.clear();
        navigate('/login')
      }
    }
  }
  // Get all notes
  const getAllNotes = async () => {
    try{
      const response = await axiosInstance.get('/notes/');
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    }catch(err){
      console.log("An unexpected error occured. please try agains");
    }
  }
  // Delete Note
  const deleteNote = async (data) => {
    try{
      const response = await axiosInstance.delete(`/notes/destroy/${data._id}`);
      if(response.data && !response.data.error){
        showToastMessage("Note Deleted Successfully",'delete');
        getAllNotes();
      }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        console.log('An unexpected error occurred. Please try again.');
      }
    }
  }
  // Search for notes
  const onSearchNote = async (query) => {
    try{
      const response = await axiosInstance.get('/notes/search',{
        params:{query},
      });
      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    }catch(err){
      console.log(err);
    }
  }
  // Clear the search
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  },[]);
  return (
    <>
      <Navbar 
        userInfo={userInfo} 
        onSearchNote={onSearchNote} 
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className='grid grid-cols-3 gap-4 mt-8'>
            {allNotes.map((item,index) => (
                <NoteCard 
                  key={index}
                  title={item.title} 
                  date={item.createdAt} 
                  content={item.content} 
                  tags={item.tags}
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item)}
                  onPinNote={() => {}} 
                />
            ))}
            </div>
        ):(
          <EmptyCard 
            imgSrc={isSearch? noDataImg:addNotesImg} 
            message={isSearch? `Oops! No notes found matching your search.`:`Start creating your first note! Click the 'Add button to jot down thoughts, ideas, and reminders. L'ets get strted!`}
          />
        )}
      </div>
      <button 
        className='w-16 h-16 flex items-center items-cneter justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
        onClick={() => {
          setOpenAddEditModal({isShown:true,type:'add',data:null});
        }}
        >
        <MdAdd className='text-[32px] text-white'/>
      </button>
      <Modal 
      isOpen={openAddEditModal.isShown} 
      onRequestClose={() => {}} 
      style={{
        overlay:{
          backgroundColor:"rgba(0,0,0,.2)",
        },
      }}
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">
        <AddEditNotes 
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({isShown:false, type:"add", data:null})
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast 
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
        />
    </>
  )
}

export default Home
