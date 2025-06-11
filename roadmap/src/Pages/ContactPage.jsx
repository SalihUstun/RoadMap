import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="bg-light p-5 rounded shadow">
          <h2 className="fw-bold mb-4">Hakkımızda</h2>
          <p className="lead">
            Bu proje, Fırat Üniversitesi Bilgisayar Mühendisliği öğrencileri tarafından
            dönem projesi kapsamında geliştirilmiştir.
          </p>
          <hr />
          <div className="mt-4">
            <p><strong>Proje Adı:</strong> RoadMap</p>
            <p><strong>Proje Türü:</strong> Şehir Bilgi ve Gezi Rehberi Uygulaması</p>
            <p><strong>Geliştirenler ve İletişim Adresleri</strong></p>
            <ul>
              <li>
                Salih Üstün –
                <a href="mailto:salih.ustun@example.com" className="ms-2 text-decoration-none">
                  salih.ustun@gmail.com
                </a>
              </li>
              <li>
                Emre Gülek –
                <a href="mailto:emre.gulek@example.com" className="ms-2 text-decoration-none">
                  emregulek77@gmail.com
                </a>
              </li>
              <li>
                Gökhan Şentürk –
                <a href="mailto:gokhan.senturk@example.com" className="ms-2 text-decoration-none">
                  gokhan.senturk@gmail.com
                </a>
              </li>
            </ul>
            <p className="mt-4">
              Proje kapsamında Türkiye'deki şehirler hakkında bilgiler, hava durumu ve gezilecek yerler API'ler aracılığıyla kullanıcıya sunulmaktadır.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
