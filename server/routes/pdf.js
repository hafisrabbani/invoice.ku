import express from 'express'
const router = express.Router()
import { fetchPDF,sendPDF,createPDF } from '../controllers/pdfController.js'

router.post('/send-pdf', sendPDF);
router.get('/fetch-pdf', fetchPDF);
router.post('/create-pdf', createPDF);

export default router