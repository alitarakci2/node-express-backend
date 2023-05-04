const { v4: uuidv4, v4 } = require('uuid');

const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find a place for the provided User id.",
      404
    );

    return next(error);
  }

  res.json({ places });
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

const updatePlace = (req, res, next) => {

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId)};
  console.log(updatedPlace)
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  console.log(updatedPlace);
  updatedPlace.title = title;
  console.log(updatedPlace.title);
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({place: updatedPlace});


};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({message: 'Deleted place.'});

};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;


