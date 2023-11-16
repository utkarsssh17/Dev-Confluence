import Event from "../models/event.js";
import User from "../models/user.js";
import * as helperFn from "./helpers.js";


const eventCategories = ["Food & Drink", "Government", "Health", "Music", "Networking", "Party", "Science & Tech", "Sports", "Travel & Outdoor", "Other"];

const renderCreateEvent = (req, res) => {
    console.log("reached here");
    res.render("create-event", { title: "Create an Event", user: req.user, categories: eventCategories });
};

// Create new event
const createEvent = async (req, res, next) => {
    const { eventTitle, eventDescription, eventLocation, eventDate, eventTime, eventDuration, eventCategory, eventMaxCapacity } = req.body;
    const newEvent = new Event({
        title: eventTitle,
        description: eventDescription,
        location: eventLocation,
        eventDate: eventDate,
        eventTime: eventTime,
        duration: eventDuration,
        category: eventCategory,
        maxCapacity: eventMaxCapacity,
    });
    try {
        newEvent.organizerId = req.user.id;
        await newEvent.save();
        req.flash("successMessage", "Event created successfully.");
        return res.status(200).send({ eventId: newEvent._id, successMessage: req.flash("successMessage") });
    } catch (error) {
        return res.status(400).send({ errors: error.message });
    }
};

// Edit event
const renderEditEvent = async (req, res, next) => {
    const event = await Event.findById(req.params.id).lean();
    
    if (!event) {
        return res.status(404).render("error", { title: "404 Event Not Found!", statusCode: 404, errorMessage: "The event you are trying to modify does not exist.", user: req.user });
    }
    if (event.organizerId.toString() !== req.user.id.toString()) {
        return res.status(400).render("error", { title: "400 Bad Request", statusCode: 400, errorMessage: "You can only edit your own events.", user: req.user });
    }
    event.eventDate = helperFn.formatDate(event.eventDate);
    return res.render("edit-event", { title: "Edit Event", event, user: req.user, categories: eventCategories });
};

const editEvent = async (req, res, next) => {
    const { eventTitle, eventDescription, eventLocation, eventDate, eventTime, eventDuration, eventCategory, eventMaxCapacity } = req.body;
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send({ errorMessage: "The event you are trying to modify does not exist." });
        }
        if (event.organizerId.toString() !== req.user.id.toString()) {
            return res.status(400).send({ errorMessage: "You can only edit your own events." });
        }

        event.title = eventTitle;
        event.description = eventDescription;
        event.eventLocation = eventLocation;
        event.eventDate = eventDate;
        event.eventTime = eventTime;
        event.duration = eventDuration;
        event.category = eventCategory;
        event.maxCapacity = eventMaxCapacity;
        await event.save();
        return res.status(200).send({ successMessage: "Event updated successfully." });
    } catch (error) {
        return res.status(400).send({ errors: error.message });
    }
};

export {renderCreateEvent,createEvent,renderEditEvent,editEvent};