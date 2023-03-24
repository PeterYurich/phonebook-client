import Header from "components/Header/Header";
import { UserRoutes } from 'UserRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from 'redux/auth/authOperations';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <div>
      <Header></Header>
      <UserRoutes></UserRoutes>
    </div>
  )
}

export default App