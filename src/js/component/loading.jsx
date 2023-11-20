import React, { Suspense, lazy, useEffect, useState, useCallback, useReducer } from "react";
import { Spinner } from "reactstrap";
import { Informacion2 } from "./informacion2.jsx";


function Loading(props) {
  const [carga, setCarga] = useState(false);
  const [show, toggle] = useReducer(state => !state, true);
  let LoadView = useCallback(React.lazy(() => import('./loadingChild.jsx')), [])



  /* function ProfileDetails() {
      // Try to read user info, although it might not have loaded yet
      const user = resource.user.read();
      return <h1>{user.name}</h1>;
    } */

  /* function ProfilePage() {
      return (
        <Suspense fallback={<h1>Loading profile...</h1>}>
          <ProfileDetails />
          <Suspense fallback={<h1>Loading posts...</h1>}>
            <ProfileTimeline />
          </Suspense>
        </Suspense>
      );
    } */

  return (
    <>
      <Suspense fallback={
        <div className="d-flex justify-content-center">
          <Spinner color="primary" />
        </div>
      }>
        <Suspense fallback={
          <div className="d-flex justify-content-center">
            <Spinner color="danger" />
          </div>
        }>
          {show && <LoadView componente={props.componente} carga={carga} setCarga={setCarga} />}
        </Suspense>

      </Suspense>
    </>
  )
}
export default Loading;