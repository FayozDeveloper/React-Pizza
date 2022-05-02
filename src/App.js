import React from "react";
import {Route} from 'react-router-dom'
import './scss/app.scss';
import {Header} from './components/ImportMain';
import {Cart, Home} from './pages/indexPages'


 function App (){

    return(
         <div>
             <div className="wrapper">
                 <Header/>
                 <div className="content">
                     <Route path={'/'} component={Home} exact/>
                     <Route path={'/Cart'} component={Cart} exact/>
                 </div>
             </div>
             <h4 className='Dev'>© 2022. F.Kakhramonov</h4>
         </div>
     )
 }

 export default App


