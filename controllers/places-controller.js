const { v4: uuidv4, v4 } = require('uuid');

const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state building",
    description: "One of the most famous skyscrappers in the world",
    location: {
      lat: 40.765743634,
      lng: -73.984435435,
    },
    adress: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }
  res.json({ place: place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided User id.",
      404
    );

    return next(error);
  }

  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, adress, creator } = req.body;
   const createdPlace = {
    id: v4(),
    title,
    description,
    location: coordinates,
    adress,
    creator
   };

   DUMMY_PLACES.push(createdPlace);

   res.status(201).json({place: createdPlace});
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
