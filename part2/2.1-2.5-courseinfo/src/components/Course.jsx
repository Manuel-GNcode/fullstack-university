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

export default Course;