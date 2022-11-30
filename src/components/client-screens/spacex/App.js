import React from 'react'

import {Routes, Route, useSearchParams, Navigate} from "react-router-dom"
import LaunchesList from './components/LaunchesList';

const App = () => {
  return (<>


<Routes>
  <Route path="/" element={<Navigate to="/search"/>} />
  <Route path='search' element={<LaunchesList/>}/>
</Routes>



  </>  );
}
 
export default App; 