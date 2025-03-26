// // import React from "react";
// // import { useContext } from "react";
// // import { Context } from "../../main";
// // import { Navigate } from "react-router-dom";
// // import HeroSection from "./HeroSection";
// // import HowItWorks from "./HowItWorks";
// // import PopularCategories from "./PopularCategories";
// // import PopularCompanies from "./PopularCompanies";

// // const Home = () => {
// //   const { isAuthorized } = useContext(Context);
// //   if (!isAuthorized) {
// //     return <Navigate to={"/login"} />;
// //   }
// //   return (
// //     <>
// //       <section className="homePage page">
// //         <HeroSection />
// //         <HowItWorks />
// //         <PopularCategories />
// //         <PopularCompanies />
// //       </section>
// //     </>
// //   );
// // };

// // export default Home;
// import React from "react";
// import { useContext } from "react";
// import { Context } from "../../main";
// import { Navigate } from "react-router-dom";

// const Home = () => {
//   const { isAuthorized } = useContext(Context);
//   if (!isAuthorized) {
//     return <Navigate to={"/login"} />;
//   }
//   return (
//     <>
//       <section className="homePage page">
//         {/* Removed HeroSection, HowItWorks, PopularCategories, and PopularCompanies */}
//       </section>
//     </>
//   );
// };

// export default Home;
import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        {/* Removed HowItWorks */}
      </section>
    </>
  );
};

export default Home;