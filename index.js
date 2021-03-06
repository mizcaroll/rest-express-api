const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "maths" },
  { id: 2, name: "javascript" },
  { id: 3, name: "node" },
  { id: 4, name: "python" }
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
    return res.status(404).send("The course with the given id was not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    //Look up the course
    //If not existing return 404 - Resourse not found
    const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given id was not found");
    //Validate, If invalid, return 400 - Bad request.
    const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
    //Update course, Return the updated course to the client.
    course.name = req.body.name;
    res.send(course);
   
});

app.delete("/api/courses/:id", (req, res) => {
  //Lookup the course, if it doesn't exist, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
   return res.status(404).send("The course with the given id was not found");
//Delete found course
const index = courses.indexOf(course);
courses.splice(index, 1);
//Return the deleted course
res.send(course);
})

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
}
return Joi.validate(course, schema);
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
