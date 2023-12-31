import { Router } from 'express';
import { ensureAuthenticated } from '../controllers/helpers.js';
import * as eventController from '../controllers/events.js';
import * as commentsController from '../controllers/comments.js';
import * as reviewController from '../controllers/reviews.js';

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
// Edit event
router.get('/:id/edit', ensureAuthenticated,eventController.renderEditEvent);

router.put('/:id/edit', ensureAuthenticated, eventController.editEvent);

// Add comment
router.post('/:id/comment', ensureAuthenticated, commentsController.addComment);

// Edit comment
router.put('/:id/comment/:commentId', ensureAuthenticated, commentsController.editComment);

// Delete comment
router.delete('/:id/comment/:commentId', ensureAuthenticated, commentsController.deleteComment);

// Add review 
router.post('/:id/review', ensureAuthenticated, reviewController.addReview);

// Edit review 
router.put('/:id/review/:reviewId', ensureAuthenticated, reviewController.editReview);

// Delete review 
router.delete('/:id/review/:reviewId', ensureAuthenticated, reviewController.deleteReview);

export default router;