const Header = ({ title }) => <h2>{title}</h2>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => {
  const total = parts.reduce((acc, crr) => acc + crr.exercises, 0);

  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <Total total={total} />
    </div>
  )
}

const Total = ({ total }) => <strong>Number of exercises {total}</strong>

const Course = ({ course }) => {
  return (
    <section>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </section>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  )
}

export default App