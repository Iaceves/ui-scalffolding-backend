import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTeam } from "../features/teams/teamSlice";

function TeamForm (){
    const [name, setName] = useState('');
    const [teamSize, setTeamSize] = useState(0);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createTeam({name: name, teamSize: teamSize}))
        setName("")
        setTeamSize(0)
    }

  return (
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Team</label>
                <input type="text" name='name' id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="number" name="teamSize" value={teamSize}  onChange={(e) => setTeamSize(e.target.value)} /> 
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>Add Team</button>
            </div>
        </form>
    </section>
  )
}

export default TeamForm;