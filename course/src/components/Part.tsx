import { type CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart } : {coursePart: CoursePart}) => {
  switch (coursePart.kind) {
    case "basic":
      return(
        <>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>{coursePart.description}</p>
        </>
      );
    case "group":
      return(
        <>
          <h4>
              {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>group project count: {coursePart.groupProjectCount}</p>
        </>
      );
    case "background":
      return(
        <>
          <h4>
              {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>{coursePart.description}</p>
          <p>background material: {coursePart.backgroundMaterial}</p>
        </>
      );
    case "special":
      return(
        <>
          <h4>
              {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>{coursePart.description}</p>
          <p>requirements {coursePart.requirements.map(requirement => requirement +" ")}</p>
        </>
      );
    default:
      assertNever(coursePart);
      break;
  }
}

export default Part;