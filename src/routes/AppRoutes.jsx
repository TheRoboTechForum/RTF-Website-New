// import FirstYearRegistration from '../pages/FirstYearRegistration';


// import { Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home';
// import About from '../pages/About';
// import Achievement from '../pages/Achievement';
// import Contact from '../pages/Contact';
// import Gallery from '../pages/Gallery';
// import Login from '../pages/Login';
// import Projects from '../pages/Projects';
// import Register from '../pages/Register';
// import Sponsors from '../pages/Sponsors';
// import Team from '../pages/Team';
// import Timeline from '../pages/Timeline';
// import MailConsole from '../pages/MailConsole';

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/achievement" element={<Achievement />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/gallery" element={<Gallery />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/projects" element={<Projects />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/sponsors" element={<Sponsors />} />
//       <Route path="/team" element={<Team />} />
//       <Route path="/timeline" element={<Timeline />} />
//       <Route path="/mail-console" element={<MailConsole />} />
//       <Route path="/first-year-registration" element={<FirstYearRegistration />} />
//     </Routes>
//     <Route path="/first-year-registration" element={<div style={{ color: 'white', padding: '150px', fontSize: '40px' }}>TEST WORKS</div>} />
//   );
// }

// export default AppRoutes;


import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Achievement from '../pages/Achievement';
import Contact from '../pages/Contact';
import Gallery from '../pages/Gallery';
import Login from '../pages/Login';
import Projects from '../pages/Projects';
import Register from '../pages/Register';
import Sponsors from '../pages/Sponsors';
import Team from '../pages/Team';
import Timeline from '../pages/Timeline';
import MailConsole from '../pages/MailConsole';
// import FirstYearRegistration from '../pages/FirstYearRegistration';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/achievement" element={<Achievement />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/login" element={<Login />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sponsors" element={<Sponsors />} />
      <Route path="/team" element={<Team />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/mail-console" element={<MailConsole />} />
      {/* <Route path="/first-year-registration" element={<FirstYearRegistration />} /> */}
    </Routes>
  );
}

export default AppRoutes;