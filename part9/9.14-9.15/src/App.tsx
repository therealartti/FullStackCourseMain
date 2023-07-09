const App = () => {
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartBasic extends CoursePartBase {
    description?: never;
    kind: "basic"
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
    kind: "description"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    description?: never;
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartBase {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartBase {
    requirements: string[];
    kind: "special"
  }
  
  type CoursePart = CoursePartBasic | CoursePartDescription | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "description"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "description"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "description",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;

interface PartProps {
  coursePart: {
    kind: string;
    name: string;
    exerciseCount: number;
    description?: string;
    groupProjectCount?: number;
    backgroundMaterial?: string;
    requirements?: string[];
  };
}


const Part = (props: PartProps): JSX.Element => {
    switch (props.coursePart.kind) {
      case "basic":
        console.log("Basic")
        return (<p></p>)
      case "description":
        console.log("Description")
        return (<i>{props.coursePart.description} </i>)
      case "group":
        console.log("Group")
        return (<>project exercices {props.coursePart.groupProjectCount} </>)
      case "background":
        console.log("Background")
        return (<div><>submit to {props.coursePart.backgroundMaterial} </> <i>
          <br />
          {props.coursePart.description}
        </i></div>)
      case "special":
        console.log("Special")
        return (<><i>{props.coursePart.description}</i>
        <br />
        required skills: {props.coursePart.requirements?.join(", ")}</>)
      default:
        return (<p></p>)
    }
}

interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.name}</h1>
}

interface CoursePart {
  name: string;
  exerciseCount: number;
  kind: string;
}

interface CourseProps {
  courseParts: CoursePart[];
}

const Content = (props: CourseProps): JSX.Element => {
  return (
    <div>
    {props.courseParts.map((content, index) => (
      <div key={index}>
        <br />
      <b>
      {content.name} {content.exerciseCount}
      </b>
      <br />
      <Part coursePart={content}/>
      </div>
    ))}
  </div>
  )
}

const Total = (props: CourseProps): JSX.Element => {
  return (
    <p>
    Number of exercises{" "}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  )
}
