import React from 'react'
import {MdOutlinePushPin} from "react-icons/md";
import {MdCreate,MdDelete} from "react-icons/md";
import moment from 'moment';

const NoteCard = ({title,date,content,tags,isPinned,onEdit,onDelete,onPinNote}) => {

  return (
    <div className='border border-gray-200 rounded p-6 bg-white hover:shadowxl transition-all ease-in-out'>
      <div className='flex items-center justify-between'>
        <div>
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">{moment(date).format("Do MMM YYYY")}</span>
        </div>
        <MdOutlinePushPin className={`text-xl ${isPinned?'text-primary':'text-slate-300'} cursor-pointer hover:text-primary`} onClick={onPinNote}/>
      </div>
      <p className='text-xs text-slate-600 mtj-2'>
        {content?.slice(0,60)}
      </p>
      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-slate-500'>{tags.map((tag) => `#${tag} ` )}</div>
        <div className="flex items-center gap-2">
            <MdCreate className='text-xl text-slate-300 cursor-pointer hover:text-primary hover:text-green-600' onClick={onEdit} />
            <MdDelete className='text-xl text-slate-300 cursor-pointer hover:text-primary hover:text-red-500' onClick={onDelete} />
        </div>
      </div>
    </div>
  )
}

export default NoteCard
