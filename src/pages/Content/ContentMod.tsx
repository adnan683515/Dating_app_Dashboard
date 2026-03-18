import ConTentList from "./ConTentList";
import ContentStats from "./ContentStats";


export default function ContentMod() {
  return (
    <div>
      <div className="my-3">
        <ContentStats></ContentStats>
      </div>

      <div>
        <ConTentList></ConTentList>
      </div>
      
    </div>
  )
}
