import { type CoursePart } from "../types";
import Part from "./Part";
const Content = ({ courseParts } : {courseParts: CoursePart[]}) => {
  return (
    <>
      {courseParts.map(coursePart => 
        <Part key={coursePart.name} coursePart={coursePart}/>
      )}
    </>
  )
}

export default Content;