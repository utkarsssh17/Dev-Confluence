import Event from "../models/event.js";


const eventCategories = ["Python","Unix","Cloud","Security","Devops","Front-End","Back-End"];

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

export {renderCreateEvent,createEvent};