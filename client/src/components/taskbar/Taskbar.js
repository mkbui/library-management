import React from 'react';
import './Taskbar.css';
import 'tachyons';

const Taskbar = () => {
    return (
<header className="sans-serif">
  <div className="cover bg-left bg-center-l" style={{backgroundImage:"url(https://cdn.pixabay.com/photo/2016/08/24/16/20/books-1617327_1280.jpg)"}}>
    <div className="bg-black-80 pb5 pb6-m pb7-l">
      <nav className="dt w-100 mw8 center"> 
      </nav> 
      <div className="tc-l mt4 mt5-m mt6-l ph3">
        <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">Bach Khoa Library</h1>
        <h2 className="fw1 f3 white-80 mt3 mb4">Simple and efficient</h2>
        <a className="f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3" href="">Learn more</a>
      </div>
    </div>
  </div> 
</header>

    );
}

export default Taskbar;