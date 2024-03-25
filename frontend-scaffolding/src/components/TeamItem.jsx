import { useDispatch } from "react-redux";
import { deleteTeam } from "../features/teams/teamSlice";

function TeamItem({team}) {

    const dispatch = useDispatch();
  return (
    <div className="team">
        <div>
            {new Date(team.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{team.name}</h2>
        <h3>{team.teamSize}</h3>
        <button onClick={() => dispatch(deleteTeam(team._id))} className="close">X</button>
    </div>
  )
}

export default TeamItem;