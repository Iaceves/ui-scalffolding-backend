import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TeamForm from "../components/TeamForm";
import TeamItem from "../components/TeamItem";
import Spinner from "../components/Spinner";
import { getTeams, reset } from '../features/teams/teamSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {teams, isLoading, isError, message} = useSelector((state) => state.teams)
  useEffect(() => {
    if(isError){
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getTeams())

    return () => {
      dispatch(reset())
    }

  }, [])


  if (isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Team Dashboard</p>
      </section>

      <TeamForm />

      <section className="content">
        {teams.length > 0 ? (
          <div className="teams">
            {teams.map((team) => (
              <TeamItem key={team._id} team={team} />
            ))}
          </div>
        ) : (<h3>You have not set any teams!</h3>) }
      </section>
    </>
  )
}

export default Dashboard;