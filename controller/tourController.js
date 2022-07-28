const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// console.log(tours);

// delete tours[9];

// console.log('After delete');

// console.log(tours);

exports.checkID = (req, res, next, val) => {
  console.log(`Check id = ${val}`);
  if (req.params.id * 1 >= tours.length)
    return res.status(404).json({ status: 'Can not found id, try again!' });

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res
      .status(400)
      .json({ status: 'Bad request', message: 'Missing name or price' });

  next();
};

exports.getAllTour = (req, res) => {
  res.status(200).json({ status: 'sucess', result: 9, data: { tours } });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  // console.log(id, typeof id);

  const findTourById = tours.find((el) => el.id === id);

  // if (!findTourById)
  //   return res.status(404).json({ status: 'Can not find tour!' });

  console.log(findTourById);

  res.status(200).json({
    status: 'success',
    data: {
      findTourById,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  console.log(tours[tours.length - 1]);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  // if (req.params.id * 1 >= tours.length) {
  //   return res.status(404).json({ status: '404 can not found id' });
  // }

  res.status(200).json({
    status: 'success',
  });
};

exports.deleteTour = (req, res) => {
  // const id = req.params.id * 1;

  res.status(204).json({ status: 'success' });
};
