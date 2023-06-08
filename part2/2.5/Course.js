const Course = (props) =>{
  console.log(props.course.parts)

  return(
    <div>
      <h2>{props.course.name}</h2>
      {props.course.parts.map(subject => <p key={subject.id}>
      {subject.name} {subject.exercises}</p>)}
      <b>total of {props.course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
    </div>
  )
}
  
export default Course
