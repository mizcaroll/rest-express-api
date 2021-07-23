const express = require("express");
const app = express();
app.use(express.json());

const courses = [
 { id: 1, name: 'maths' },   
 { id: 2, name: 'javascript' },   
 { id: 3, name: 'node' }   
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given id was not found');
    res.send(course);
  });

app.post('/api/courses', (req, res) => {  
const course = {
    id: courses.length + 1,
    name: req.body.name
}

console.log(course)
courses.push(course);
console.log(courses)
res.send(course);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
