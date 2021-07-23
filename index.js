const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "maths" },
  { id: 2, name: "javascript" },
  { id: 3, name: "node" },
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given id was not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  console.log(course);
  courses.push(course);
  console.log(courses);
  res.send(course);
});
app.put("/api/courses/:id", (req, res) => {
    //Look up the course
    


    //If not existing return 404 - Resourse not found
    //Validate
    //If invalid, return 400 - Bad request
    //Update course 
    //Return the updated course to the client
});
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
