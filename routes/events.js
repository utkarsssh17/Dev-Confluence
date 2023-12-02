import { Router } from 'express';
import { ensureAuthenticated } from '../controllers/helpers.js';
import * as eventController from '../controllers/events.js';

const router = Router();

// Create new event
router.get('/create',ensureAuthenticated,eventController.renderCreateEvent);// TODO ensureAuthenticated in between the  .get() ensureAuthenticated,

// Router Post event 
router.post('/create', ensureAuthenticated, eventController.createEvent);

// Get event by id
router.get('/:id', eventController.getEventById);

// Event RSVP endpoint
router.post('/:id/rsvp', ensureAuthenticated, eventController.rsvpEvent);

// Delete event
router.delete('/:id', ensureAuthenticated, eventController.deleteEvent);

export default router;