const express = require('express');
const fs = require('fs');
const { type } = require('os');

const port = 3000;
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// console.log(tours);

// delete tours[9];

// console.log('After delete');

console.log(typeof tours);

// console.log(tours);

const getAllTour = (req, res) => {
  res.status(200).json({ status: 'sucess', result: 9, data: { tours } });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  // console.log(id, typeof id);

  const findTourById = tours.find((el) => el.id === id);

  if (!findTourById)
    return res.status(404).json({ status: 'Can not find tour!' });

  console.log(findTourById);

  res.status(200).json({
    status: 'success',
    data: {
      findTourById,
    },
  });
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({ status: '404 can not found id' });
  }

  res.status(200).json({
    status: 'success',
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 >= tours.length)
    return res.status(404).json({ status: 'can not found id, try again' });

  const id = req.params.id * 1;

  const deleteTour = tours.find((el) => el.id === id);
};

// app.get('/api/v1/tours', getAllTour);

// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTour).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`Server loading from port ${port}`);
});
