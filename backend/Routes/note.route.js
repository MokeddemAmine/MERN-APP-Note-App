import {Router} from 'express';
import { authenticateToken } from '../utilities.js';
import { addNote, editNote, getNotes, deleteNote, editPinnedNote, searchNotes } from '../controllers/note.controller.js';


const router = Router();

router.post('/add',authenticateToken,addNote);
router.put('/edit/:id',authenticateToken,editNote);
router.get('/',authenticateToken,getNotes);
router.delete('/destroy/:id',authenticateToken,deleteNote);
router.put('/edit/pinned/:id',authenticateToken,editPinnedNote)
router.get('/search',authenticateToken,searchNotes)

export default router;