import React from 'react'
import Navbar from "../../Components/Navbar/Navbar"
import './SearchPage.css'
const SearchPage = () => {
  return (
    <>
    <Navbar/>

     <div className="row featurette my-5 mx-5">
      <div className="col-md-7">
        <h2 className="featurette-heading fw-normal lh-1">
        Şehir ismi.{" "}
        <hr />
          <span className="text-body-secondary">Şehre ait bir slogan</span>
        </h2>
        <p className="lead">
          Şehir hakkında bilgi
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ex odio nam porro repellendus? Totam, in. Soluta, nihil! Unde aut in architecto modi temporibus quaerat repellendus labore harum provident, optio alias officiis dignissimos culpa. Tempore illo neque est eaque inventore nulla modi voluptatibus distinctio tempora laborum cumque magni quae quasi nisi vel pariatur, deleniti blanditiis laudantium delectus, possimus doloremque earum porro. Inventore consectetur deserunt ipsum illum quis tenetur laboriosam, error fugiat. Unde in excepturi molestias ratione consectetur minus magnam ipsa dolorem similique! Quaerat quos sapiente, aperiam ad maxime ab distinctio dolor nulla eligendi mollitia quasi! Veritatis necessitatibus et maxime atque.
        </p>
      </div>
      <div className="col-md-5">
        <svg
          aria-label="Placeholder: 500x500"
          className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
          width="500"
          height="500"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          preserveAspectRatio="xMidYMid slice"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="var(--bs-secondary-bg)" />
          <text
            x="50%"
            y="50%"
            fill="var(--bs-secondary-color)"
            dy=".3em"
            textAnchor="middle"
          >
            500x500
          </text>
        </svg>
      </div>
    </div>
    
    <div className="row featurette my-5 mx-5">
  <div className="col-md-5">
    <svg
      aria-label="Placeholder: 500x500"
      className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
      width="500"
      height="500"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      preserveAspectRatio="xMidYMid slice"
    >
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="var(--bs-secondary-bg)" />
      <text
        x="50%"
        y="50%"
        fill="var(--bs-secondary-color)"
        dy=".3em"
        textAnchor="middle"
      >
        500x500
      </text>
    </svg>
  </div>

  <div className="col-md-7">
    <h2 className="featurette-heading fw-normal lh-1">
      Places Api'den alınan veri  <hr />
    </h2>
    <p className="lead">
     https://www-geoapify-com.translate.goog/places-api/?_x_tr_sl=en&_x_tr_tl=tr&_x_tr_hl=tr&_x_tr_pto=tc
    </p>
  </div>
</div>


    

    </>
  )
}
export default SearchPage